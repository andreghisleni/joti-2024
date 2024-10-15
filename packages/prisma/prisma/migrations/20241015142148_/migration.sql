-- CreateTable
CREATE TABLE "JotiMember" (
    "id" TEXT NOT NULL,
    "external_id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "group_name" TEXT NOT NULL,
    "group_number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "lgpd" BOOLEAN NOT NULL,
    "register" TEXT NOT NULL,
    "session" TEXT NOT NULL,
    "association" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "v" INTEGER NOT NULL,
    "member_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JotiMember_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JotiMember" ADD CONSTRAINT "JotiMember_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
