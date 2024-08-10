import { Dropdown, Space } from "antd";
import styles from '../../pages/DetailedApplication/DetailedApplication.module.scss'
import { Dots } from "../../pages/DetailedApplication/Svgs";

const TopActions = ({ status, items }) => {
    return (
        <div className={styles.topContainer}>
            <Dropdown className={styles.customDropdown} menu={{ items }}>
                <Space>
                    {status === "Рассмотрена" && (
                        <div className={styles.dots}>
                            <Dots />
                        </div>
                    )}
                </Space>
            </Dropdown>
        </div>
    );
};


export default TopActions