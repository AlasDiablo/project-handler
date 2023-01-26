import {
    Client, REST, Routes, GatewayIntentBits,
} from 'discord.js';
import {
    DeathLineCommandSet,
    DeathLineCommandCreate,
    DeathLineCommandCreateAction,
    DeathLineCommandTarget,
} from './death-line';
import { TOKEN, CLIENT_ID, REGISTER_COMMAND } from '../config';

const commands = [
    DeathLineCommandSet,
    DeathLineCommandTarget,
    DeathLineCommandCreate,
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

const command = async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
};

const run = () => {
    console.log('Start discord client');

    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
        ],
    });

    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });

    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName === DeathLineCommandCreate.name) {
            DeathLineCommandCreateAction(interaction);
        }
    });

    client.login(TOKEN).then();
};

if (REGISTER_COMMAND) {
    command().then(run);
} else {
    run();
}
