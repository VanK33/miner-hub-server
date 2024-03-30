/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return (
    knex.schema
      // create user table
      .createTable("user", function (table) {
        table.increments("id");
      })

      //create scope table
      .createTable("scope", function (table) {
        table.increments("id");
        table.varchar("scope", 255).notNullable();
      })

      // create character table
      .createTable("character", function (table) {
        table.increments("id");
        table.integer("user_id").unsigned().notNullable();
        table
          .foreign("user_id")
          .references("user.id")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table.varchar("character_owner_hash", 255).notNullable();
        table.enum("role", ["primary", "alt"]).notNullable();
        table.timestamp("first_seen").defaultTo(knex.fn.now());
        table.timestamp("updated_on").defaultTo(knex.fn.now());
      })

      // create token table
      .createTable("token", function (table) {
        table.increments("id");
        table.integer("character_id").unsigned().notNullable();
        table
          .foreign("character_id")
          .references("character.id")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table.integer("scope_id").unsigned().notNullable();
        table.foreign("scope_id").references("scope.id");
        table.varchar("access_token", 255).notNullable();
        table.varchar("refresh_token", 255).notNullable();
        table.timestamp("token_expiry").notNullable();
      })

      // create moons table
      .createTable("moons", function (table) {
        table.increments("id");
        table.integer("typeId").notNullable();
        table
          .foreign("typeId")
          .references("invtypes.typeId")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table.integer("character_id").unsigned().notNullable();
        table.foreign("character_id").references("character.id");
        table.string("name", 255).notNullable();
        table.enum("type", ["ore, moon, ice, gas"]).notNullable();
        table.enum("class", ["R64,R32,R16,R8,R4"]).notNullable();
        table.integer("quantity").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
      })

      // create gases table
      .createTable("gases", function (table) {
        table.increments("id");
        table.integer("typeId").notNullable();
        table
          .foreign("typeId")
          .references("invtypes.typeId")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table.integer("character_id").unsigned().notNullable();
        table.foreign("character_id").references("character.id");
        table.string("name", 255).notNullable();
        table.enum("type", ["ore, moon, ice, gas"]).notNullable();
        table.integer("quantity").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
      })

      // create ores table
      .createTable("ores", function (table) {
        table.increments("id");
        table.integer("typeId").notNullable();
        table
          .foreign("typeId")
          .references("invtypes.typeId")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table.integer("character_id").unsigned().notNullable();
        table.foreign("character_id").references("character.id");
        table.string("name", 255).notNullable();
        table.enum("type", ["ore, moon, ice, gas"]).notNullable();
        table
          .enum("class", [
            "Abyssal, Mercoxit, Complex, Variegated, Coherent, Simple",
          ])
          .notNullable();
        table.integer("quantity").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
      })

      // create ices table
      .createTable("ices", function (table) {
        table.increments("id");
        table.integer("typeId").notNullable();
        table
          .foreign("typeId")
          .references("invtypes.typeId")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table.integer("character_id").unsigned().notNullable();
        table.foreign("character_id").references("character.id");
        table.string("name", 255).notNullable();
        table.enum("type", ["ore, moon, ice, gas"]).notNullable();
        table.integer("quantity").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
      })
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("user")
    .dropTableIfExists("character")
    .dropTableIfExists("token")
    .dropTableIfExists("scope")
    .dropTableIfExists("moons")
    .dropTableIfExists("gases")
    .dropTableIfExists("ores")
    .dropTableIfExists("ices");
};
