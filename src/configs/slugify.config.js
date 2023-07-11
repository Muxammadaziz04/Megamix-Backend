const slugifyConfig = {
    replacement: "-",
    remove: /[*+~.()'"!:@]/g,
    lower: true,
    strict: true,
    locale: "vi",
    trim: true,
}

module.exports = slugifyConfig