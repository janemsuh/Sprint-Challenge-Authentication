exports.seed = async function(knex) {
    await knex('users').truncate();
    await knex('users').insert([
        { username: 'cbrown', password: 'snoopyismybff' },
        { username: 'sbrown', password: 'iheartlinus' },
    ]);
};