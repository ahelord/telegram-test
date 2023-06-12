import { MigrationInterface, QueryRunner } from 'typeorm';

export class createChatMessage1686518035046 implements MigrationInterface {
  name = 'createChatMessage1686518035046';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "chat_message" ("id" SERIAL NOT NULL, "externalId" character varying NOT NULL, "message" character varying NOT NULL, "fromExternalId" character varying NOT NULL, "attachmentUrl" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3cc0d85193aade457d3077dd06b" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "chat_message"`);
  }
}
