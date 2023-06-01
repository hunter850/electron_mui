import type { ForgeConfig } from "@electron-forge/shared-types";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerZIP } from "@electron-forge/maker-zip";
import { MakerDeb } from "@electron-forge/maker-deb";
import { MakerRpm } from "@electron-forge/maker-rpm";

const config: ForgeConfig = {
    packagerConfig: {
        asar: true,
        icon: "./src/assets/icon",
    },
    rebuildConfig: {},
    makers: [
        new MakerSquirrel({
            setupIcon: "./src/assets/icon.ico",
        }),
        new MakerZIP({}, ["darwin"]),
        new MakerRpm({}),
        new MakerDeb({
            options: {
                icon: "./src/assets/icon.png",
            },
        }),
    ],
};

export default config;
