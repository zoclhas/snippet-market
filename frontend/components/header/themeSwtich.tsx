import {
    useMantineColorScheme,
    ActionIcon,
    Group,
    createStyles,
} from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const useStyles = createStyles((theme) => ({
    theme_switch_show: {
        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },

    theme_switch_hide: {
        [theme.fn.largerThan("sm")]: {
            display: "none",
        },
    },
}));

export function ThemeSwitch(display?: any) {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const { classes } = useStyles();

    return (
        <Group
            position="center"
            my="xl"
            className={
                display["display"] === "hide"
                    ? classes.theme_switch_show
                    : classes.theme_switch_hide
            }
        >
            <ActionIcon
                onClick={() => toggleColorScheme()}
                size="lg"
                radius="md"
                sx={(theme) => ({
                    backgroundColor:
                        theme.colorScheme === "dark"
                            ? theme.colors.dark[6]
                            : theme.colors.gray[0],
                    color:
                        theme.colorScheme === "dark"
                            ? theme.colors.yellow[4]
                            : theme.colors.blue[6],
                })}
            >
                {colorScheme === "dark" ? (
                    <FontAwesomeIcon icon={faSun} />
                ) : (
                    <FontAwesomeIcon icon={faMoon} />
                )}
            </ActionIcon>
        </Group>
    );
}
