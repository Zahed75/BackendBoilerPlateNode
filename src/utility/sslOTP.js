// const axios = require('axios').default;
// const { customAlphabet } = require('nanoid');

// const sendOTPSMS = async (message, to) => {
//   const generateCSMSID = customAlphabet('1234567890', 10);

//   const res = await axios.post(
//     `https://smsplus.sslwireless.com/api/v3/send-sms?api_token=${
//       process.env.SSL_API_TOKEN
//     }&sid=${
//       process.env.SSL_SID
//     }&sms=${message}&msisdn=${to}&csms_id=${generateCSMSID()}`
//   );

//   console.log({ res });

//   return res;
// };

// module.exports = {
//   sendOTPSMS,
// };
