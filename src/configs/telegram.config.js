const feedbackTemplate = ({ fullName = '', phoneNumber = '', description = '' }) => {
    return `
🛎 Новая заявка: 

👤 Имя Фамилия: ${fullName}
📞 Номер телефона: ${phoneNumber}
🗞 Сообщение: ${description}
    `
}

const UserTemplate = ({ fullName = '', phoneNumber = '', description = '' }) => {
    return `
🛎 Новый пользователь: 

👤 Имя Фамилия: ${fullName}
📞 Номер телефона: ${phoneNumber}
    `
}

module.exports = {
    feedbackTemplate,
    UserTemplate
}