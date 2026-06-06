import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { colorPalettes, currentPaletteName } from "./theme/palettes"

const config = await loadQuartzConfig()
config.configuration.theme.colors = colorPalettes[currentPaletteName]

export default config
export const layout = await loadQuartzLayout()
