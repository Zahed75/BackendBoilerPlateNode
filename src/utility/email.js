const nodemailer = require('nodemailer');

//emails
const brandManagerInvitationEmail = require('../templates/brandManagerInviation');
const outletManagerInvitationEmail = require('../templates/outletManagerInvitation');
const placedOrderManagerEmail = require('../templates/placeOrderManagerEmail');
const placedOrderCustomerEmail = require('../templates/placeOrderCustomerEmail');

const createToken = require('./createToken');
const { BRAND_MANAGER } = require('../config/constants');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: '',
    pass: '',
  },
});

// const transporter = nodemailer.createTransport({
//   host: 'sandbox.smtp.mailtrap.io',
//   port: 2525,
//   auth: {
//     user: 'f1d6b9428c38b9',
//     pass: '5dd5f51f90845a',
//   },
// });

exports.sendCreateManagerEmail = (to, user) => {
  const { email, password } = user;
  let mailOptions = {
    from: 'Syscomatic-Technologies  <tech.syscomatic@gmail.com>',
    to,
    subject: 'Brand Manager Account Credentials',
    text: `Your account has been created. 
    \n your email: ${email} 
    \n your password: ${password} 
    \n\n Instructions: 
    \n1. Visit app.onnow.io 
    \n2. Login with your credentials
    \n3. You will be redirected to verification page 
    \n4. Verify OTP and then you will be redirected to dashboard`,
  };
  return new Promise((resolve) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) resolve(err);
      resolve(info);
    });
  });
};

exports.sendSetPasswordEmail = (to, user) => {
  const { email, brands } = user;

  const setPasswordToken = createToken({ email }, { expiresIn: '24h' });

  const setPasswordLink = `${process.env.CLIENT_URL}/invitation?token=${setPasswordToken}`;

  const brandManagerEmail = brandManagerInvitationEmail({
    setPasswordLink,
    brands,
  });

  let mailOptions = {
    from: 'Onnow Customer Service <customerservice@onnow.io>',
    to,
    subject: 'Brand Manager Set Password',
    html: brandManagerEmail,
  };

  return new Promise((resolve) => {
    transporter.sendMail(mailOptions, (err, info) => {
      console.log({ info, err });
      if (err) resolve(err);
      resolve(info);
    });
  });
};





exports.setPasswordEmailOutlet = (to, user) => {
  const { email, outlets } = user;

  const setPasswordToken = createToken({ email }, { expiresIn: '24h' });

  const setPasswordLink = `${process.env.CLIENT_URL}/invitation?token=${setPasswordToken}`;

  const outletManagerEmail = outletManagerInvitationEmail({
    setPasswordLink,
    outlets,
  });

  let mailOptions = {
    from: 'Onnow Customer Service <customerservice@onnow.io>',
    to,
    subject: 'Outlet Manager Set Password',
    html: outletManagerEmail,
  };

  return new Promise((resolve) => {
    transporter.sendMail(mailOptions, (err, info) => {
      console.log({ info, err });
      if (err) resolve(err);
      resolve(info);
    });
  });
};




exports.SendEmailUtility = async (EmailTo, EmailText, EmailSubject) => {
  let mailOptions = {
    from: 'Syscomatic-Technologies  <tech.syscomatic@gmail.com>',
    to: EmailTo,
    subject: EmailSubject,
    text: EmailText,
  };

  return new Promise((resolve) => {
    transporter.sendMail(mailOptions, (err, info) => {
      console.log({ info });
      if (err) {
        resolve(err);
      }
      resolve(info);
    });
  });
};

exports.sendManagerOrderPlacedEmail = (user, order) => {
  const { email, role } = user;

  const orderPlaceEmail = placedOrderManagerEmail(user, order);

  let mailOptions = {
    from: 'Onnow Customer Service <customerservice@onnow.io>',
    to: email,
    subject: `Your ${
      role === BRAND_MANAGER ? 'Brand' : 'Kitchen'
    } received an order`,
    html: orderPlaceEmail,
  };

  return new Promise((resolve) => {
    transporter.sendMail(mailOptions, (err, info) => {
      console.log({ info });
      if (err) {
        resolve(err);
      }
      resolve(info);
    });
  });
};

exports.sendCustomerOrderPlacedEmail = (brand, order) => {
  const { customer } = order;

  const orderPlaceEmail = placedOrderCustomerEmail(brand, order);

  let mailOptions = {
    from: 'Onnow Customer Service <customerservice@onnow.io>',
    to: customer.email,
    subject: `Your order placed successfully`,
    html: orderPlaceEmail,
  };

  return new Promise((resolve) => {
    transporter.sendMail(mailOptions, (err, info) => {
      console.log({ info });
      if (err) {
        resolve(err);
      }
      resolve(info);
    });
  });
};
