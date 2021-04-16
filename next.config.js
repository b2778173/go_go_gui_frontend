const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_SERVER
} = require("next/constants")

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      /* development only config options here */
      env: {
        API_BASE_URL: "http://localhost:5000"
      }
    }
  }
  if (phase === PHASE_PRODUCTION_SERVER) {
    return {
      /* config options for all phases except development here */
      env: {
        API_BASE_URL: "https://limitless-peak-52274.herokuapp.com"
      }
    }
  }
  return defaultConfig
}
