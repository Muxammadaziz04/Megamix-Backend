const feedbackTemplate = ({ fullName = '', phoneNumber = '', description = '' }) => {
    return `
🛎 Новая заявка: 

👤 Имя Фамилия: ${fullName}
📞 Номер телефона: ${phoneNumber}
🗞 Сообщение: ${description}
    `
}

module.exports = {
    feedbackTemplate
}