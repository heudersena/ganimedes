-- AlterTable
ALTER TABLE `mercadopagos` MODIFY `m_id` VARCHAR(191) NOT NULL DEFAULT 'NULL',
    MODIFY `m_status_detail` ENUM('accredited', 'cancelled', 'expired', 'pending_waiting_transfer') NOT NULL;

-- AlterTable
ALTER TABLE `profiles` MODIFY `reference_code` VARCHAR(191) NOT NULL DEFAULT 'NULL';
