const logOut = new LogoutButton();
const ratesBoard = new RatesBoard();
const moneyManager = new MoneyManager();
const favoritesWidget = new FavoritesWidget();

logOut.action = function () {
    ApiConnector.logout(res =>{
        if (res.success) {
            location.reload();
        }
    })
}

ApiConnector.current(res => {
    if (res.success) {
        ProfileWidget.showProfile(res.data)
    }
})

function getRatesBoard() {
    ApiConnector.getStocks(res => {
        if (res.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(res.data);
        }
    })
}
getRatesBoard();
setInterval(getRatesBoard, 6000);

moneyManager.addMoneyCallback = function (data) {
    ApiConnector.addMoney(data, res => {
        if (res.success) {
            ProfileWidget.showProfile(data);
            moneyManager.setMessage(true, "Баланс успешно пополнен");
        } else {
            moneyManager.setMessage(false, res.error);
        }
    })
}

moneyManager.conversionMoneyCallback = function (data) {
    ApiConnector.convertMoney(data, res => {
        if (res.success) {
            ProfileWidget.showProfile(data);
            moneyManager.setMessage(true, "Конвертация выполнена");
        } else {
            moneyManager.setMessage(false, res.error)
        }
    })
}

moneyManager.sendMoneyCallback = function (data) {
    ApiConnector.transferMoney(data, res => {
        if (res.success) {
            ProfileWidget.showProfile(data);
            moneyManager.setMessage(true, "Перевод валюты выполнен");
        } else {
            moneyManager.setMessage(false, res.error)
        }
    })
}

ApiConnector.getFavorites(res=> {
    favoritesWidget.clearTable();
    if (res.data){
        favoritesWidget.fillTable(res.data);
        moneyManager.updateUsersList(res.data);
    }
})

favoritesWidget.addUserCallback = function (data) {
    ApiConnector.addUserToFavorites(data, res => {
        if (res.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(res.data);
            moneyManager.updateUsersList(res.data);
            favoritesWidget.setMessage(true, "Пользователь добавлен");
        } else {
            favoritesWidget.setMessage(false, res.data);
        }
    })
}

favoritesWidget.removeUserCallback = function (data) {
    ApiConnector.removeUserFromFavorites(data, res => {
        if (res.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(res.data);
            moneyManager.updateUsersList(res.data);
            favoritesWidget.setMessage(true, "Пользователь удалён");
        } else {
            favoritesWidget.setMessage(false, res.data);
        }
    })
}