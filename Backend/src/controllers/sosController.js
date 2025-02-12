const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
const emergencyNumber = process.env.EMERGENCY_PHONE_NUMBER;


const client = twilio(accountSid, authToken);

const makeEmergencyCall = async (req, res) => {
  try {
    const call = await client.calls.create({
      twiml: `<Response><Say>Emergency call placed. Please stay on the line.</Say></Response>`,
      to: emergencyNumber,
      from: twilioPhone,
    });

    res.json({ success: true, number: emergencyNumber, callSid: call.sid });
  } catch (error) {
    console.error("Twilio Call Error:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to place emergency call." });
  }
};

module.exports = { makeEmergencyCall };
