const APP = {
  DIR: `${__dirname}/public/`,
  RESPONSE_CODES: {
    STATE_OK: "200",
    STATE_ERROR: "400"
  },
  ROOMS: {
    DENOMINATION: {
      SINGLE: "single",
      DOUBLE: "double",
      TRIPLE: "triple",
      CUADRUPLE: "quadruple",
      FAMILY: "family"
    },
    FLOOR: {
      FIRST: "first",
      MEZZANINE: "mezzanine",
      SECOND: "second"
    }
  },
  MERCADOPAGO: {
    SANDBOX: "TEST-6713397966770115-071423-2efad159909606551ce5cdb95a94babd-132831761"
  }
}

module.exports = APP;
