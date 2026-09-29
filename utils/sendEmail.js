export async function sendOtpEmail(to, code) {
  // TODO: replace with nodemailer + a real SMTP provider (Gmail App Password, Resend, etc.)
  console.log(`\n📧  OTP for ${to}: ${code}\n`)
}