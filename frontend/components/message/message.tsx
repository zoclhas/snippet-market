import { Alert } from "@mantine/core";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

export function Message({ children, title, color }) {
    return (
        <Alert
            icon={<FontAwesomeIcon icon={faCircleExclamation} />}
            title={title}
            color={color}
            radius="lg"
        >
            {children}
        </Alert>
    );
}
