            function chooseStoragePath() {
                var storageAlias = $("#storageAlias").val();
                var storagePath = $("#storagePath").val();
                if (storageAlias !== "NONE") {
                    browseKeyStore(storageAlias, "P12", storagePath, "chooseStoragePathBack");
                }
            }

            function chooseStoragePathBack(rw) {
                var storagePath = $("#storagePath").val();

                if (rw.getErrorCode() === "NONE") {
                    storagePath = rw.getResult();
                    if (storagePath !== null && storagePath !== "") {
                        $("#storagePath").val(storagePath);
                    }
                    else {
                        $("#storageAlias").val("NONE");
                        $("#storagePath").val("");
                    }
                } else {
                    $("#storageAlias").val("NONE");
                    $("#storagePath").val("");
                }
            }

            function fillKeysBack(result) {
                if (result['errorCode'] === "NONE") {
                    var keyListEl = document.getElementById('keys');
                    keyListEl.options.length = 0;
                    var list = result['result'];
                    var slotListArr = list.split("\n");
                    for (var i = 0; i < slotListArr.length; i++) {
                        if (slotListArr[i] === null || slotListArr[i] === "") {
                            continue;
                        }
                        keyListEl.options[keyListEl.length] = new Option(slotListArr[i], i);
                    }
                    keysOptionChanged();
                }
                else {
                    if (result['errorCode'] === "WRONG_PASSWORD" && result['result'] > -1) {
                        alert("Неправильный пароль! Количество оставшихся попыток: " + result['result']);
                    } else if (result['errorCode'] === "WRONG_PASSWORD") {
                        alert("Неправильный пароль!");
                    } else {
                        alert(result['errorCode']);
                    }
                    var keyListEl = document.getElementById('keys');
                    keyListEl.options.length = 0;
                }
            }

            function fillKeys() {
                var storageAlias = $("#storageAlias").val();
                var storagePath = $("#storagePath").val();
                var password = $("#password").val();
                var keyType = "";
                var selected = $("input[type='radio'][name='keyType']:checked");
                if (selected.length > 0) {
                    keyType = selected.val();
                }

                if (storagePath !== null && storagePath !== "" && storageAlias !== null && storageAlias !== "") {
                    if (password !== null && password !== "") {
                        getKeys(storageAlias, storagePath, password, keyType, "fillKeysBack");
                    } else {
                        alert("Введите пароль к хранилищу");
                    }
                } else {
                    alert("Не выбран хранилище!");
                }
            }

            function keysOptionChanged() {
                var str = $("#keys :selected").text();
                var alias = str.split("|")[3];
                $("#keyAlias").val(alias);
            }

            function setLocaleCall() {
                var lang = $("#lang").val();
                setLocale(lang);
            }

            function getNotBeforeCall() {
                var storageAlias = $("#storageAlias").val();
                var storagePath = $("#storagePath").val();
                var password = $("#password").val();
                var alias = $("#keyAlias").val();
                if (storagePath !== null && storagePath !== "" && storageAlias !== null && storageAlias !== "") {
                    if (password !== null && password !== "") {
                        if (alias !== null && alias !== "") {
                            getNotBefore(storageAlias, storagePath, alias, password, "getNotBeforeBack");
                        }
                        else {
                            alert("Вы не выбран ключ!");
                        }
                    } else {
                        alert("Введите пароль к хранилищу");
                    }
                } else {
                    alert("Не выбран хранилище!");
                }
            }

            function getNotBeforeBack(result) {
                if (result['errorCode'] === "NONE") {
                    $("#notbefore").val(result['result']);
                }
                else {
                    if (result['errorCode'] === "WRONG_PASSWORD" && result['result'] > -1) {
                        alert("Неправильный пароль! Количество оставшихся попыток: " + result['result']);
                    } else if (result['errorCode'] === "WRONG_PASSWORD") {
                        alert("Неправильный пароль!");
                    } else {
                        alert(result['errorCode']);
                    }
                }
            }

            function getNotAfterCall() {
                var storageAlias = $("#storageAlias").val();
                var storagePath = $("#storagePath").val();
                var password = $("#password").val();
                var alias = $("#keyAlias").val();
                if (storagePath !== null && storagePath !== "" && storageAlias !== null && storageAlias !== "") {
                    if (password !== null && password !== "") {
                        if (alias !== null && alias !== "") {
                            getNotAfter(storageAlias, storagePath, alias, password, "getNotAfterBack");
                        } else {
                            alert("Вы не выбрали ключ!");
                        }
                    } else {
                        alert("Введите пароль к хранилищу");
                    }
                } else {
                    alert("Не выбран хранилище!");
                }
            }

            function getNotAfterBack(result) {
                if (result['errorCode'] === "NONE") {
                    $("#notafter").val(result['result']);
                } else {
                    if (result['errorCode'] === "WRONG_PASSWORD" && result['result'] > -1) {
                        alert("Неправильный пароль! Количество оставшихся попыток: " + result['result']);
                    } else if (result['errorCode'] === "WRONG_PASSWORD") {
                        alert("Неправильный пароль!");
                    } else {
                        alert(result['errorCode']);
                    }
                }
            }

            function createCMSSignatureCall() {
                var storageAlias = $("#storageAlias").val();
                var storagePath = $("#storagePath").val();
                var password = $("#password").val();
                var alias = $("#keyAlias").val();
                $("#identifierCMS").text("Не проверено");
                if (storagePath !== null && storagePath !== "" && storageAlias !== null && storageAlias !== "") {
                    if (password !== null && password !== "") {
                        if (alias !== null && alias !== "") {
                            var data = $("#dateCMS").val();
                            var flag = $("#flag").is(':checked');

                            if (data !== null && data !== "") {
                                if (flag) {
                                    createCMSSignature(storageAlias, storagePath, alias, password, data, true, "createCMSSignatureBack");
                                }
                                else {
                                    createCMSSignature(storageAlias, storagePath, alias, password, data, false, "createCMSSignatureBack");
                                }
                            }
                            else {
                                alert("Вы не ввели данные!");
                            }
                        } else {
                            alert("Вы не выбрали ключ!");
                        }
                    } else {
                        alert("Введите пароль к хранилищу");
                    }
                } else {
                    alert("Не выбран хранилище!");
                }
            }

            function createCMSSignatureBack(result) {
                if (result['errorCode'] === "NONE") {
                    $("#signatureCMS").text(result['result']);
                }
                else {
                    if (result['errorCode'] === "WRONG_PASSWORD" && result['result'] > -1) {
                        alert("Неправильный пароль! Количество оставшихся попыток: " + result['result']);
                    } else if (result['errorCode'] === "WRONG_PASSWORD") {
                        alert("Неправильный пароль!");
                    } else {
                        $("#signatureCMS").text("");
                        alert(result['errorCode']);
                    }
                }
            }

            function signXmlCall() {
                var storageAlias = $("#storageAlias").val();
                var storagePath = $("#storagePath").val();
                var password = $("#password").val();
                var alias = $("#keyAlias").val();
                $("#identifierXML").text("Не проверено");
                if (storagePath !== null && storagePath !== "" && storageAlias !== null && storageAlias !== "") {
                    if (password !== null && password !== "") {
                        if (alias !== null && alias !== "") {
                            var data = document.getElementById("dateXML").value;
                            if (data !== null && data !== "") {
                                signXml(storageAlias, storagePath, alias, password, data, "signXmlBack");
                            }
                            else {
                                alert("Вы не ввели данные!");
                            }
                        } else {
                            alert("Вы не выбрали ключ!");
                        }
                    } else {
                        alert("Введите пароль к хранилищу");
                    }
                } else {
                    alert("Не выбран хранилище!");
                }
            }

            function signXmlBack(result) {
                if (result['errorCode'] === "NONE") {
                    document.getElementById("signatureXML").value = result['result'];
                }
                else {
                    if (result['errorCode'] === "WRONG_PASSWORD" && result['result'] > -1) {
                        alert("Неправильный пароль! Количество оставшихся попыток: " + result['result']);
                    } else if (result['errorCode'] === "WRONG_PASSWORD") {
                        alert("Неправильный пароль!");
                    } else {
                        document.getElementById("signatureXML").value = "";
                        alert(result['errorCode']);
                    }
                }
            }



            function verifyXmlCall() {
                var signature = document.getElementById("signatureXML").value;
                if (signature !== null && signature !== "") {
                    verifyXml(signature, "verifyXmlBack");
                }
                else {
                    alert("Не найден подписанный XML!");
                }
            }

            function verifyXmlBack(result) {
                if (result['errorCode'] === "NONE") {
                    if (result['result'])
                    {
                        $("#identifierXML").text("Валидная подпись");
                    }
                    else {
                        $("#identifierXML").text("Неправильная подпись");
                    }
                }
                else {
                    if (result['errorCode'] === "WRONG_PASSWORD" && result['result'] > -1) {
                        alert("Неправильный пароль! Количество оставшихся попыток: " + result['result']);
                    } else if (result['errorCode'] === "WRONG_PASSWORD") {
                        alert("Неправильный пароль!");
                    } else {
                        $("#identifierXML").text("Неправильная подпись");
                        alert(result['errorCode']);
                    }
                }
            }

            function verifyCMSSignatureCall() {
                var data = $("#dateCMS").val();
                var signatureCMS = $("#signatureCMS").val();
                if (signatureCMS !== null && signatureCMS !== "") {
                    verifyCMSSignature(signatureCMS, data, "verifyCMSSignatureBack");
                }
                else {
                    alert("Вы не ввели данные, или подписанные данные не найдены!");
                }
            }

            function verifyCMSSignatureBack(result) {
                if (result['errorCode'] === "NONE") {
                    if (result['result'])
                    {
                        $("#identifierCMS").text("Валидная подпись");
                    }
                    else {
                        $("#identifierCMS").text(result);
                    }
                } else {
                    $("#identifierCMS").text("Неправильная подпись");
                    alert(result['errorCode']);
                }
            }

            function getRdnByOidCall() {
                var storageAlias = $("#storageAlias").val();
                var storagePath = $("#storagePath").val();
                var password = $("#password").val();
                var alias = $("#keyAlias").val();
                if (storagePath !== null && storagePath !== "" && storageAlias !== null && storageAlias !== "") {
                    if (password !== null && password !== "") {
                        if (alias !== null && alias !== "") {
                            var oid = "";
                            var selected = $("input[type='radio'][name='oid']:checked");
                            if (selected.length > 0) {
                                oid = selected.val();
                            }
                            getRdnByOid(storageAlias, storagePath, alias, password, oid, 0, "getRdnByOidBack");
                        } else {
                            alert("Вы не выбрали ключ!");
                        }
                    } else {
                        alert("Введите пароль к хранилищу");
                    }
                } else {
                    alert("Не выбран хранилище!");
                }
            }

            function getRdnByOidBack(result) {
                if (result['errorCode'] === "NONE") {
                    $("#rdnvalue").val(result['result']);
                }
                else {
                    if (result['errorCode'] === "WRONG_PASSWORD" && result['result'] > -1) {
                        alert("Неправильный пароль! Количество оставшихся попыток: " + result['result']);
                    } else if (result['errorCode'] === "WRONG_PASSWORD") {
                        alert("Неправильный пароль!");
                    } else {
                        $("#rdnvalue").val("RDN не найден!");
                        alert(result['errorCode']);
                    }
                }
            }

            function getHashCall() {
                var hashAlgorithm = $("#hashAlg").val();
                var dataHash = $("#dataHash").val();
                if (dataHash !== null && dataHash !== "") {
                    getHash(dataHash, hashAlgorithm, "getHashBack");
                }
                else {
                    alert("Вы не ввели данные для хеширование");
                }
            }

            function getHashBack(result) {
                if (result['errorCode'] === "NONE") {
                    $("#hashArea").text(result['result']);
                } else {
                    alert(result['errorCode']);
                }
            }