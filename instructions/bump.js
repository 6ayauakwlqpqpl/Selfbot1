let bumpIntervals = {};

module.exports = {
  name: 'bump',
  async execute(message, args, config) {
    const channelId = message.channel.id;

    try {
      await sendBumpCommand(message.channel);
    } catch (error) {
      console.error(`Error sending immediate /bump command:`, error);
    }

    // Prevent Detection 
    if (!bumpIntervals[channelId]) {
      const startBumping = () => {
        bumpIntervals[channelId] = setTimeout(async () => {
          try {
            await sendBumpCommand(message.channel);
          } catch (error) {
            console.error(`Error sending /bump command:`, error);
          }
          startBumping(); 
        }, Math.round(Math.random() * (1860000 - 1800000 + 1)) + 1800000);
      };
      startBumping();
      message.channel.send(`\`\`\`✔ Started sending /bump command at random intervals in this channel.\`\`\``);
    } else {
      message.channel.send(`\`\`\`❗ Already sending /bump commands in this channel.\`\`\``);
    }
  }
};

async function sendBumpCommand(channel) {
  try {
    await channel.sendSlash('1089935069927456849', 'bump');
  } catch (error) {
    console.error('Failed to send /bump command:', error);
  }
}
