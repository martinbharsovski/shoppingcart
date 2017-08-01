/**
 * Created by martin.harsovski on 6/22/2017.
 */

var myModule = (function () {
    var mainDiv = document.getElementById("mainDiv");
    var firstDiv = document.getElementById("cartProduct");
    var section = document.getElementsByClassName("cart")[0];
    var totalSum = document.getElementById("totalSum");
    var totalSumTax = document.getElementById("totalSumTax");
    var data = [];
    var arr = [];

    var makeGetRequest = (function () {
        return {
            xhr: function (url, callback) {

                var xmlHttpRequest = new XMLHttpRequest();
                xmlHttpRequest.overrideMimeType("application/json");
                xmlHttpRequest.open('GET', url, true);
                xmlHttpRequest.onreadystatechange = function () {
                    if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == "200") {
                        var json = xmlHttpRequest.responseText;
                        data = JSON.parse(json);
                        callback(data);
                    }
                }
                xmlHttpRequest.send();
            },
            ajax:function (url,callback) {
                $.get(url).then(function (data) {
                    callback(data)
                    }).catch(function () {
                    alert("not found");
                })

            }
        }
    }());

    var createElement = function (jsonArray) {
        for (var i = 0; size = jsonArray.length, i < size; i++) {
            var div = document.createElement("div");
            div.setAttribute("class", "product");
            div.innerHTML = `<img src="${jsonArray[i].image.small}"><br> 
                           <h3 class="product-title">${jsonArray[i].name}</h3>
                           <label>${jsonArray[i].price}</label><i>$</i>
                           <div>
                           <button class="btn-order">Buy</button>
                           
                           </div>
                           `;
            mainDiv.appendChild(div);

            //<button class="btn-view"><i class="fa fa-search"></i></button>
            //imagesize 150/185
        }
    }
    var deleteItem = function (e) {

        mainDiv.removeChild(e);
    }
    var addAllListeners = function () {
        mainDiv.addEventListener('click', function (e) {
            var span = firstDiv.getElementsByTagName("span");
            var img = document.getElementsByTagName("img");
            var sum = 0;
            var total;
            console.log(e.target.className)
            if (e.target.nodeName === "BUTTON" && e.target.className === "btn-order") {
                var p = document.createElement("p");
                var name = e.target.parentElement.parentElement.querySelector("h3");
                var price = e.target.parentElement.parentElement.querySelector("label");

                p.innerHTML = `<span style="float:right">${name.textContent}  ${price.textContent} $</span>`;
                firstDiv.appendChild(p);
                section.scrollTop = section.scrollHeight;
                arr.push(price.textContent);
                // deleteItem(e.target.parentElement.parentElement);


            }

            for (var i = 0; i < arr.length; i++) {
                sum += Number(arr[i]);
            }
            totalSum.innerHTML = `NO TAX  : ${sum} $`;
            total = sum + 0.2 * sum;
            totalSumTax.innerHTML = `TOTAL: ${total} $`
        })

    }

    makeGetRequest.ajax("../data/products.json", createElement);
    addAllListeners();
    return {
        makeGetRequest: makeGetRequest,
        createElement: createElement,
        deleteItem: deleteItem,
        addAllListeners: addAllListeners
    }
}());




