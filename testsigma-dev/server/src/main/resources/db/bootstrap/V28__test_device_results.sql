DROP TABLE IF EXISTS `test_device_results`;
CREATE TABLE `test_device_results`
(
  `id`                           BIGINT(20)   NOT NULL AUTO_INCREMENT,
  `test_device_id`               BIGINT(20)        DEFAULT NULL,
  `duration`                     BIGINT(20)        DEFAULT NULL,
  `test_plan_result_id`          BIGINT(20)   NOT NULL,
  `start_time`                   TIMESTAMP    NULL DEFAULT NULL,
  `end_time`                     TIMESTAMP    NULL DEFAULT NULL,
  `result`                       VARCHAR(100)      DEFAULT NULL,
  `status`                       VARCHAR(100)      DEFAULT NULL,
  `browser_version`              VARCHAR(100) NUll,
  `message`                      TEXT,
  `agent_start_time`             TIMESTAMP    NULL DEFAULT NULL,
  `agent_end_time`               TIMESTAMP    NULL DEFAULT NULL,
  `app_upload_version_id`        BIGINT(20)     DEFAULT NULL,
  `environment_settings`         JSON,
  `execution_initiated_on`       TIMESTAMP    NULL DEFAULT NULL,
  `agent_picked_on`              TIMESTAMP    NULL DEFAULT NULL,
  `device_allocated_on`          TIMESTAMP    NULL DEFAULT NULL,
  `session_created_on`           TIMESTAMP    NULL DEFAULT NULL,
  `session_completed_on`         TIMESTAMP    NULL DEFAULT NULL,
  `total_count`                  BIGINT(20)        DEFAULT 0,
  `failed_count`                 BIGINT(20)        DEFAULT 0,
  `passed_count`                 BIGINT(20)        DEFAULT 0,
  `aborted_count`                BIGINT(20)        DEFAULT 0,
  `stopped_count`                BIGINT(20)        DEFAULT 0,
  `not_executed_count`           BIGINT(20)        DEFAULT 0,
  `queued_count`                 BIGINT(20)        DEFAULT 0,
  `is_visually_passed`           BIT(1)            DEFAULT NULL,
  `session_id`                   VARCHAR(256)      DEFAULT NULL,
  `re_run_parent_id`             BIGINT(20)        DEFAULT NULL,
  `prerequisite_test_device_result_id` BIGINT(20)  DEFAULT NULL,
  `test_lab_type`                VARCHAR(255)      DEFAULT NULL,
  `workspace_version_id`         BIGINT(20)        DEFAULT NULL,
  `platform_assets_endpoint_url` TEXT              DEFAULT NULL,
  `queued`                       TINYINT(1)        DEFAULT 0,
  `initiated`                    TINYINT(1)        DEFAULT 0,
  `created_date`                 DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_date`                 DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `index_test_device_results_on_test_plan_result_id` (`test_plan_result_id`),
  KEY `index_test_device_results_on_status_index` (`status`),
  KEY `index_test_device_results_on_result_index` (`result`),
  KEY `index_test_device_results_on_re_run_parent_id_index` (`re_run_parent_id`),
  CONSTRAINT `fk_test_plan_run_id_in_test_device_results_to_test_plan_results` FOREIGN KEY (`test_plan_result_id`) REFERENCES `test_plan_results` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_workspace_version_id_in_device_results_to_workspace_versions` FOREIGN KEY (`workspace_version_id`) REFERENCES `workspace_versions` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE = InnoDB
  AUTO_INCREMENT = 238
  DEFAULT CHARSET = utf8
  COLLATE utf8_unicode_ci;