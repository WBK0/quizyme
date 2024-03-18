import transporter from "@/utils/mailer";

const sendEmail = async (to : string) => {
  try {
    await transporter.sendMail({
      from: 'QuizyMe@codebybartlomiej.pl',
      to: to,
      subject: 'Email confirmed successfully | QuizyMe',
      html: `
      <html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>Email confirmed successfully</title>
					<link rel="preconnect" href="https://fonts.googleapis.com">
					<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
					<link href="https://fonts.googleapis.com/css2?family=News+Cycle:wght@400;700&family=Oswald:wght@200..700&family=Roboto+Condensed:wght@700&display=swap" rel="stylesheet">
					<style>
						*{
							margin: 0;
							padding: 0;
							box-sizing: border-box;
							font-family: "News Cycle", sans-serif;
							font-weight: 700;
						}
						.container {
							color: black;

						}
						.button{
							display: inline-block;
							padding: 10px 20px;
							background-color: black;
							color: white;
							text-align: center;
							text-decoration: none;
							font-size: 16px;
							border-radius: 12px;
							margin-top: 20px;
							transition-duration: 300ms;
							cursor: pointer;
						}
						.button:hover{
							scale: 105%;
						}
						.code{				
							display: flex;
							width: fit-content;
							margin-top: 30px;
							margin-bottom: 10px;
						}
						.code p{
							font-size: 20px;
							width: 58px;
							height: 58px;
							line-height: 58px;
							background-color: #f5f2f2;
							border-radius: 8px;
							font-size: 24px;
							font-weight: 900;
							margin-left: 4px;
							margin-right: 4px;
						}
						.ignore{
							margin-top: 25px;
							font-size: 14px;
						}
						.team{
							margin-top: 4px;
							font-size: 18px;
							text-decoration: none;
							color: black;
						}
						.team:hover{
							color: rgb(50, 50, 50)
						}
					</style>
				</head>
				<body>
					<div class="container" align="center">
					<img src="cid:logo" alt="logo" />
					<h1 style="width: fit-content; margin-top: 15px; margin-bottom: 15px;">Thank you for confirmation account on our platform!</h1>
						<p style="margin-top: 10px; margin-bottom: 10px;">
              Your email has been confirmed successfully. Now you can use all features of QuizyMe. Complete your profile and start learning with us!
            </p>
            <p style="margin-top: 10px; margin-bottom: 10px; color: #645E5E;">
              If you have any questions or problems, please contact us at: support@codebybartlomiej.pl
            </p>
            <a class="team" href="${process.env.NEXT_PUBLIC_URL}/" style="color: black">
							QuizyMe team
						</a>
					</div>
				</body>
			</html>
			`,
			attachments: [{
        filename: 'logo.png',
        path: "@/../public/logo.png",
        cid: 'logo'
    }]
    });
  } catch (error) {
		throw new Error('An error occurred while sending email');
  }
};

export default sendEmail;