-- AlterTable
ALTER TABLE `mercadopagos` MODIFY `m_id` VARCHAR(191) NOT NULL DEFAULT 'NULL';

-- AlterTable
ALTER TABLE `profiles` MODIFY `reference_code` VARCHAR(191) NOT NULL DEFAULT 'NULL';

-- AlterTable
ALTER TABLE `withdrawals` ADD COLUMN `status` ENUM('processing', 'accepted', 'refused') NOT NULL DEFAULT 'processing',
    MODIFY `description` VARCHAR(191) NULL;
