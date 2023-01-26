export const DeathLineCommandSet = {
    name: 'deathline_set',
    description: 'Set the default death-line channel',
    options: [
        {
            name: 'channel',
            description: 'Set the ping channel',
            type: 7,
            required: true,
            autocomplete: true,
        },
    ],
};

export const DeathLineCommandTarget = {
    name: 'deathline_target',
    description: 'Set the target user or role to ping',
    options: [
        {
            name: 'target',
            description: 'Add user or role to the ping',
            type: 9,
            required: true,
            autocomplete: true,
        },
    ],
};

export const DeathLineCommandCreate = {
    name: 'deathline_create',
    description: 'Create a death-line',
    options: [
        {
            name: 'name',
            description: 'Death-line name',
            type: 3,
            required: true,
            autocomplete: true,
        },
        {
            name: 'description',
            description: 'Death-line description',
            type: 3,
            required: true,
            autocomplete: true,
        },
        {
            name: 'date',
            description: 'Death-line date, date format: `YYYY-MM-DDTHH:MM:SS` eg: `2018-09-22T15:00:00`',
            type: 3,
            required: true,
            autocomplete: true,
        },
        {
            name: 'location',
            description: 'Death-line location, eg: place, url, etc.',
            type: 3,
            required: true,
            autocomplete: true,
        },
        {
            name: 'priority',
            description: 'Death-line priority',
            type: 10,
            choices: [
                {
                    name: 'low',
                    value: 1,
                },
                {
                    name: 'medium',
                    value: 2,
                },
                {
                    name: 'high',
                    value: 3,
                },
            ],
            required: true,
            autocomplete: true,
        },
    ],
};

export const DeathLineCommandCreateAction = (interaction) => {
    const name = interaction.options.getString('name');
    const description = interaction.options.getString('description');
    const date = new Date(interaction.options.getString('date'));
    const location = interaction.options.getString('location');
    const priority = interaction.options.getNumber('priority');
    interaction.guild.scheduledEvents.create({
        name,
        description,
        privacyLevel: 2,
        entityType: 3,
        scheduledStartTime: date,
        scheduledEndTime: new Date(date.getTime() + 60000),
        entityMetadata: {
            location,
        },
    }).then(() => {
        switch (priority) {
        case 2:
            interaction.reply('The death-line was added, a ping to the member will be send at `-7Day`, `-3Day`, `-1Day`, `-12Hours`, `-6Hours`, `-3Hours` and `-1Hours`');
            break;
        case 3:
            interaction.reply('The death-line was added, a ping to the member will be send at `-3Day`, `-1Day`, `-12Hours`, `-6Hours`, `-3Hours` and `-1Hours`');
            break;
        default:
            interaction.reply('The death-line was added, a ping to the member will be send at `-1Day`, `-12Hours`, `-6Hours`, `-3Hours` and `-1Hours`');
            break;
        }
    });
};
