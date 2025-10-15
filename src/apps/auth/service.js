const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const QRCode = require("qrcode");
const { UserDB } = require("./db");
const { ErrorResponse } = require("../../middleware/errorResponse");

class AuthService {
  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static async login(data) {
    const { username, password } = data;

    const user = await UserDB.findByUsername(username);
    if (!user) {
      throw new ErrorResponse("auth.user_not_found", 404);
    }

    if (!user.is_active) {
      throw new ErrorResponse("auth.user_blocked", 403);
    }

    const isPasswordValid = await this.verifyPassword(password, user.password);
    if (!isPasswordValid) {
      throw new ErrorResponse("auth.wrong_password", 403);
    }

    const token = this.generateToken({
      id: user.id,
      username: user.username,
      fio: user.fio,
      is_admin: user.is_admin,
    });

    const userInfo = {
      id: user.id,
      username: user.username,
      fio: user.fio,
      is_admin: user.is_admin,
      is_active: user.is_active,
      created_at: user.created_at,
    };

    return {
      token,
      user: userInfo,
    };
  }

  static generateToken(payload) {
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN;

    return jwt.sign(payload, secret, { expiresIn });
  }

  static async generateQR(data) {
    try {
      // Create exports directory if it doesn't exist
      const exportsDir = path.join(process.cwd(), "public", "exports");
      if (!fs.existsSync(exportsDir)) {
        fs.mkdirSync(exportsDir, { recursive: true });
      }

      // Generate unique filename
      const timestamp = Date.now();
      const filename = `certificate_${timestamp}.pdf`;
      const filepath = path.join(exportsDir, filename);

      // Create PDF document
      const doc = new PDFDocument();
      const stream = fs.createWriteStream(filepath);
      doc.pipe(stream);

      // Add PDF content (example certificate)
      doc.fontSize(20).text("Certificate", { align: "center" });
      doc.moveDown();
      doc.fontSize(14).text(`Name: ${data.name || "Sample User"}`, { align: "left" });
      doc.text(`Date: ${new Date().toLocaleDateString()}`, { align: "left" });
      doc.text(`Certificate ID: ${data.id || timestamp}`, { align: "left" });
      doc.moveDown();
      doc.text("This is to certify that the above mentioned person has successfully completed the required criteria.", { align: "left" });

      // Finalize PDF
      doc.end();

      // Wait for PDF to be written
      await new Promise((resolve) => {
        stream.on("finish", resolve);
      });

      // Generate QR code URL
      const baseUrl = process.env.BASE_URL || "http://localhost:4001";
      const fileUrl = `${baseUrl}/credit/${filename}`;

      // Generate QR code
      const qrCodeDataURL = await QRCode.toDataURL(fileUrl);

      return {
        success: true,
        filename,
        filepath,
        fileUrl,
        qrCode: qrCodeDataURL,
        message: "PDF certificate generated and QR code created successfully",
      };
    } catch (error) {
      throw new ErrorResponse("Failed to generate QR code and PDF", 500);
    }
  }
}

module.exports = { AuthService };
