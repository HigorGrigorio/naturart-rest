'use strict';

const {literal} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return await  queryInterface.sequelize.query(literal(`
            create function remove_accents( textvalue varchar(20000) )
            returns varchar(20000)
            begin
            
            set @textvalue = textvalue;
            
            -- ACCENTS
            set @withaccents = 'ŠšŽžÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖØÙÚÛÜÝŸÞàáâãäåæçèéêëìíîïñòóôõöøùúûüýÿþƒ';
            set @withoutaccents = 'SsZzAAAAAAACEEEEIIIINOOOOOOUUUUYYBaaaaaaaceeeeiiiinoooooouuuuyybf';
            set @count = length(@withaccents);
            
            while @count > 0 do
                set @textvalue = replace(@textvalue, substring(@withaccents, @count, 1), substring(@withoutaccents, @count, 1));
                set @count = @count - 1;
            end while;
            
            -- SPECIAL CHARS
            set @special = '!@#$%¨&*()_+=§¹²³£¢¬"\`´{[^~}]<,>.:;?/°ºª+*|\\\\''';
            set @count = length(@special);
            while @count > 0 do
                set @textvalue = replace(@textvalue, substring(@special, @count, 1), '');
                set @count = @count - 1;
            end while;
            
            return @textvalue;
            
            end
        `));
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    }
};
