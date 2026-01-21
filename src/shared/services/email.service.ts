import * as brevo from '@getbrevo/brevo';

const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY!);

const SENDER = {
  email: process.env.BREVO_SENDER_EMAIL!,
  name: process.env.BREVO_SENDER_NAME!,
};

class EmailService {
  private async send(to: string, subject: string, htmlContent: string) {
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.sender = SENDER;
    sendSmtpEmail.to = [{ email: to }];
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = htmlContent;

    await apiInstance.sendTransacEmail(sendSmtpEmail);
  }

  private getTrialEndDate(): string {
    const date = new Date();

    date.setDate(date.getDate() + 7);

    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  async sendVerificationCode(email: string, code: string, firstName: string) {
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background-color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <tr>
      <td align="center" style="padding-bottom:40px;">
        <img src="https://res.cloudinary.com/dkrjrfqpy/image/upload/v1768477062/Frame_23_a3ppr0.png" alt="FE-1 Made Simple" width="60" style="display:block;">
      </td>
    </tr>
    <tr>
      <td style="background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:40px;">
        <h1 style="margin:0 0 16px;font-size:24px;font-weight:600;color:#111827;">Verify Your Email</h1>
        <p style="margin:0 0 24px;font-size:16px;line-height:24px;color:#6b7280;">Hi ${firstName},</p>
        <p style="margin:0 0 32px;font-size:16px;line-height:24px;color:#6b7280;">Use this code to verify your email address:</p>
        <div style="background:#f9fafb;border-radius:8px;padding:24px;text-align:center;margin-bottom:32px;">
          <div style="font-size:36px;font-weight:700;letter-spacing:8px;color:#111827;">${code}</div>
        </div>
        <p style="margin:0 0 8px;font-size:14px;line-height:20px;color:#9ca3af;">This code expires in 24 hours.</p>
        <p style="margin:0;font-size:14px;line-height:20px;color:#9ca3af;">If you didn't request this, ignore this email.</p>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding-top:32px;">
        <p style="margin:0;font-size:14px;color:#9ca3af;">© 2025 FE-1 Made Simple. All rights reserved.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;

    await this.send(email, 'Verify Your Email - FE-1 Made Simple', html);
  }

  async sendPasswordResetCode(email: string, code: string, firstName: string) {
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background-color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <tr>
      <td align="center" style="padding-bottom:40px;">
        <img src="https://res.cloudinary.com/dkrjrfqpy/image/upload/v1768477062/Frame_23_a3ppr0.png" alt="FE-1 Made Simple" width="60" style="display:block;">
      </td>
    </tr>
    <tr>
      <td style="background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:40px;">
        <h1 style="margin:0 0 16px;font-size:24px;font-weight:600;color:#111827;">Reset Your Password</h1>
        <p style="margin:0 0 24px;font-size:16px;line-height:24px;color:#6b7280;">Hi ${firstName},</p>
        <p style="margin:0 0 32px;font-size:16px;line-height:24px;color:#6b7280;">Use this code to reset your password:</p>
        <div style="background:#f9fafb;border-radius:8px;padding:24px;text-align:center;margin-bottom:32px;">
          <div style="font-size:36px;font-weight:700;letter-spacing:8px;color:#111827;">${code}</div>
        </div>
        <p style="margin:0 0 8px;font-size:14px;line-height:20px;color:#9ca3af;">This code expires in 1 hour.</p>
        <p style="margin:0;font-size:14px;line-height:20px;color:#9ca3af;">If you didn't request this, ignore this email.</p>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding-top:32px;">
        <p style="margin:0;font-size:14px;color:#9ca3af;">© 2025 FE-1 Made Simple. All rights reserved.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;

    await this.send(email, 'Reset Your Password - FE-1 Made Simple', html);
  }

  async sendWelcomeEmail(email: string, firstName: string) {
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to FE-1 Made Simple</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background-color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <tr>
      <td align="center" style="padding-bottom:40px;">
        <img src="https://res.cloudinary.com/dkrjrfqpy/image/upload/v1768477062/Frame_23_a3ppr0.png" alt="FE-1 Made Simple" width="60" style="display:block;">
      </td>
    </tr>
    <tr>
      <td style="background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:40px;">
        <h1 style="margin:0 0 16px;font-size:24px;font-weight:600;color:#111827;">Welcome to FE-1 Made Simple!</h1>
        <p style="margin:0 0 24px;font-size:16px;line-height:24px;color:#6b7280;">Hi ${firstName},</p>
        <p style="margin:0 0 16px;font-size:16px;line-height:24px;color:#6b7280;">Your email has been verified successfully! You now have full access to all features.</p>
        <p style="margin:0 0 32px;font-size:16px;line-height:24px;color:#6b7280;">Your <strong>7-day free trial</strong> has started. Explore our comprehensive FE-1 exam preparation materials and start your journey to success.</p>
        <div style="text-align:center;margin-bottom:32px;">
          <a href="${process.env.FRONTEND_URL}/dashboard" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:8px;font-weight:600;font-size:16px;">Go to Dashboard</a>
        </div>
        <p style="margin:0 0 8px;font-size:14px;line-height:20px;color:#6b7280;"><strong>What's next?</strong></p>
        <ul style="margin:0;padding-left:20px;font-size:14px;line-height:24px;color:#6b7280;">
          <li>Browse our 8 FE-1 subjects</li>
          <li>Practice with past exam questions</li>
          <li>Get AI feedback on your essays</li>
          <li>Track your progress</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding-top:32px;">
        <p style="margin:0;font-size:14px;color:#9ca3af;">© 2026 FE-1 Made Simple. All rights reserved.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;

    await this.send(email, 'Welcome to FE-1 Made Simple! ', html);
  }

  async sendWelcomeEmailWithTrial(email: string, firstName: string) {
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to FE-1 Made Simple</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background-color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <tr>
      <td align="center" style="padding-bottom:40px;">
        <img src="https://res.cloudinary.com/dkrjrfqpy/image/upload/v1768477062/Frame_23_a3ppr0.png" alt="FE-1 Made Simple" width="60" style="display:block;">
      </td>
    </tr>
    <tr>
      <td style="background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:40px;">
        <h1 style="margin:0 0 16px;font-size:24px;font-weight:600;color:#111827;">Welcome to FE-1 Made Simple! 🎉</h1>
        <p style="margin:0 0 24px;font-size:16px;line-height:24px;color:#6b7280;">Hi ${firstName},</p>
        <p style="margin:0 0 16px;font-size:16px;line-height:24px;color:#6b7280;">Congratulations! Your email has been verified successfully and your account is now fully activated.</p>
        
        <!-- Trial Banner -->
        <div style="background:#f0f9ff;border:2px solid #2563eb;border-radius:8px;padding:20px;margin:24px 0;">
          <p style="margin:0 0 8px;font-size:18px;font-weight:600;color:#1e40af;">🚀 Your 7-Day Free Trial Has Started!</p>
          <p style="margin:0;font-size:14px;line-height:20px;color:#1e40af;">Enjoy full access to all premium features until <strong>${this.getTrialEndDate()}</strong>. No credit card required.</p>
        </div>

        <p style="margin:0 0 32px;font-size:16px;line-height:24px;color:#6b7280;">Explore our comprehensive FE-1 exam preparation materials and start your journey to success today.</p>
        
        <div style="text-align:center;margin-bottom:32px;">
          <a href="${process.env.FRONTEND_URL}/dashboard" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:8px;font-weight:600;font-size:16px;">Go to Dashboard</a>
        </div>
        
        <p style="margin:0 0 8px;font-size:14px;line-height:20px;color:#111827;font-weight:600;">What you get during your trial:</p>
        <ul style="margin:0;padding-left:20px;font-size:14px;line-height:24px;color:#6b7280;">
          <li><strong>All 8 FE-1 Subjects</strong> - Complete access to every topic</li>
          <li><strong>Past Exam Questions</strong> - Practice with real questions from previous years</li>
          <li><strong>AI Essay Feedback</strong> - Get instant feedback on your practice essays</li>
          <li><strong>Interactive Quizzes</strong> - Test your knowledge with MCQs</li>
          <li><strong>Case Law Library</strong> - Search and reference key cases</li>
          <li><strong>Progress Tracking</strong> - Monitor your preparation journey</li>
        </ul>
        
        <div style="background:#fef3c7;border-left:4px solid #f59e0b;padding:16px;margin:24px 0;border-radius:4px;">
          <p style="margin:0;font-size:14px;line-height:20px;color:#92400e;">
            <strong>💡 Pro Tip:</strong> Make the most of your trial by setting up your study goals in the onboarding flow. This helps us personalize your learning experience!
          </p>
        </div>
        
        <p style="margin:0 0 8px;font-size:14px;line-height:20px;color:#6b7280;">Need help getting started? Check out our <a href="${process.env.FRONTEND_URL}/help" style="color:#2563eb;text-decoration:none;">Quick Start Guide</a>.</p>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding-top:32px;">
        <p style="margin:0 0 8px;font-size:14px;color:#6b7280;">Have questions? <a href="mailto:support@fe1madesimple.com" style="color:#2563eb;text-decoration:none;">Contact our support team</a></p>
        <p style="margin:0;font-size:14px;color:#9ca3af;">© 2026 FE-1 Made Simple. All rights reserved.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;

    await this.send(email, 'Welcome to FE-1 Made Simple - Your 7-Day Trial Has Started!', html);
  }
}


export default new EmailService();