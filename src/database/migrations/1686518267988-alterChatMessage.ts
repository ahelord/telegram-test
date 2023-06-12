import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterChatMessage1686518267988 implements MigrationInterface {
  name = 'alterChatMessage1686518267988';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "chat_message" ADD "groupExternalId" character varying NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "chat_message" DROP COLUMN "groupExternalId"`);
  }
}
