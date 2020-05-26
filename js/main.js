$(document).ready(function() {
    // Expand menu search
    const searchBtn = document.getElementById("search-btn");
    const searchInput = document.getElementById("search-input");

    searchBtn.addEventListener("click", () => {
        expand();
        buttonBG();
    });

    function expand() {
        searchInput.classList.toggle("rectangle");
    };

    function buttonBG() {
        searchBtn.classList.toggle("search--active");
    };

    // Log In

    var loginBtns, logoutLink, logoutBtn;

    var loginBtns = document.querySelectorAll(".login");

    function loginBtnsFunction() {
        loginBtns.forEach(element => {
            element.addEventListener('click', loginFunction);
        });
    }

    var loginFunction = function() {
        loginBtns.forEach(element => {
            element.innerHTML = "<i class='fas fa-user'></i>Hi, Michael (<span class='logout-link'>logout</span>)";
            element.classList.toggle("login");
            element.classList.toggle("logout");
            element.removeEventListener('click', loginFunction);
        });
        logoutLink = document.querySelectorAll(".logout-link");
        logoutBtn = document.querySelectorAll(".logout");
        logoutLink.forEach(element => {
            element.addEventListener('click', function(event) {
                for (var i = 0; i < logoutBtn.length; i++) {
                    logoutBtn[i].innerHTML = "<i class='fas fa-user'></i>Log In";
                    logoutBtn[i].classList.toggle("login");
                    logoutBtn[i].classList.toggle("logout");
                    };
                    event.stopPropagation();
                    loginBtnsFunction();
                })
            });
        };

        loginBtnsFunction();

    // Product Carrousel
    function imageSlide() {
        $(".image-slide").hover(function(){
            var slideNumber = $(this).attr("slide");
            $(".p-img[slide=" + slideNumber + "]").addClass("active");
            $((".p-img[slide!=" + slideNumber + "]")).removeClass("active");
        })
    };

    imageSlide();

    // Slick

    $('.carrousel-container').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 2,
        responsive: [
            {
            breakpoint: 1440,
            settings: {
                infinite: true,
                slidesToShow: 4,
                slidesToScroll: 3
            }
            },
            {
            breakpoint: 1025,
            settings: {
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 2
            }
            },
            {
            breakpoint: 900,
            settings: {
                infinite: true,
                slidesToShow: 2,
                slidesToScroll: 2
            }
            },
            {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
            }
        ]
    });

    // Product Table Header
     const headerBasketRemove = document.querySelector(".basket-products").querySelectorAll(".fa-times");

    var priceSum, priceSubtotal, productPricesCart;

    for (const button of headerBasketRemove) {
        button.addEventListener('click', function() {
            this.parentNode.remove();
            calculatePriceBasket();
        })
    }


    // Product Table Cart Page
    function calculatePriceOnLoad() {
        const productTableRemove = document.querySelector(".product-table").querySelectorAll(".fa-times");
        for (const button of productTableRemove) {
            button.addEventListener('click', function() {
                this.parentNode.parentNode.remove();
                calculatePrice();
            })
        };
    }
    function calculatePrice() {
        priceSubtotal = document.querySelector(".product-table").querySelector('.price-subtotal');
        productPricesCart = document.querySelectorAll(".product-cart-price");
        priceSum = 0;
        for (i = 0; i < productPricesCart.length; i++) {
            priceSum = priceSum + parseFloat(productPricesCart[i].innerText.split("€")[1]);
        }
        priceSubtotal.innerText = '€' + priceSum;
        document.querySelector("#payment-subtotal-value").innerText = priceSum;
        document.querySelector("#payment-total-value").innerText = priceSum + parseFloat(document.querySelector("#payment-shipping-value").innerText);
    };

    function calculatePriceBasket() {
        priceSubtotal = document.querySelector(".basket-products").querySelector('.price-subtotal');
        productPricesCart = document.querySelectorAll(".product-price");
        priceSum = 0;
        for (i = 0; i < productPricesCart.length; i++) {
            priceSum = priceSum + parseFloat(productPricesCart[i].innerText.split("€")[1]);
        }
        priceSubtotal.innerText = '€' + priceSum;
    };

        // Hide and Show Shipping Address and Payment options for Shopping Cart Page

        const continueOrderBtn = document.querySelector("#continue-order");
        const breakSection = document.querySelectorAll(".break");
        const shippingSection = document.querySelector(".shipping");
        const paymentSection = document.querySelector(".payment-section");
    
        function orderContinue() {
            document.querySelector(".check-confirm").style.display = "none";
            setTimeout(function() {
                breakSection[0].classList.remove('hidden');
                breakSection[0].classList.add('show');
            }, 10);
            setTimeout(function() {
                shippingSection.classList.remove('hidden');
                shippingSection.classList.add('show');
            }, 500);
            setTimeout(function() {
                breakSection[1].classList.remove('hidden');
                breakSection[1].classList.add('show');
            }, 500);
            setTimeout(function() {
                paymentSection.classList.remove('hidden');
                paymentSection.classList.add('show');
            }, 500);
        };

        if($('body').hasClass("shopping-cart-page")){
            calculatePriceOnLoad();
            calculatePrice();
            continueOrderBtn.addEventListener("click", () => {
                orderContinue();
            });
        }

    // Dropdowns for Product Filter

    for (const dropdown of document.querySelectorAll(".filter-wrapper")) {
        dropdown.addEventListener('click', function() {
            this.querySelector('.filter').classList.toggle('open');
        })
    }

    window.addEventListener('click', function(e) {
        for (const select of document.querySelectorAll('.filter')) {
            if (!select.contains(e.target)) {
                select.classList.remove('open');
            }
        }
    });

    for (const option of document.querySelectorAll(".filter-option")) {
        option.addEventListener('click', function() {
            if (!this.classList.contains('selected')) {
                this.parentNode.querySelector('.filter-option.selected').classList.remove('selected');
                this.classList.add('selected');
                this.closest('.filter').querySelector('.filter__trigger span').textContent = this.textContent;
                filter();
            }
        })
    }

    // Filter

    var priceFilterValue, sizeFilterValue, colorFilterValue;

    var products = document.getElementsByClassName("product");

    function filter() {
        priceFilterValue = document.getElementById("price-filter").querySelector(".selected").getAttribute("data-value");
        sizeFilterValue = document.getElementById("size-filter").querySelector(".selected").getAttribute("data-value");
        colorFilterValue = document.getElementById("color-filter").querySelector(".selected").getAttribute("data-value");
        for (i = 0; i < products.length; i++) {
            var priceCheck, sizeCheck, colorCheck;
            var productPrice = parseInt(products[i].getAttribute("data-price"), 10);
            var productSize = products[i].getAttribute("data-size").split(",");
            var productColor = products[i].getAttribute("data-color").split(",");

            if (priceFilterValue === "all") {
                priceCheck = true;
            } else {
                var priceRange = priceFilterValue.split("to");
                if (productPrice >= priceRange[0] && productPrice <= priceRange[1]) {
                    priceCheck = true;
                } else {
                    priceCheck = false;
                }        
            }

            if (sizeFilterValue === "all") {
                sizeCheck = true;
            } else {
                sizeCheck = productSize.includes(sizeFilterValue);
            }

            if (colorFilterValue === "all") {
                colorCheck = true;
            } else {
                colorCheck = productColor.includes(colorFilterValue);
            }

            if (priceCheck === true && sizeCheck === true && colorCheck === true) {
                products[i].classList.add("filter-show");
                products[i].classList.remove("filter-hidden");
            } else if (
                priceCheck === false || sizeCheck === false || colorCheck === false) {
                products[i].classList.remove("filter-show");
                products[i].classList.add("filter-hidden");
            }
        }
    }

    if($('body').hasClass("products-page")){
        fillProductInfo();
    }

    function fillProductInfo() {
        for (const product of products) {
            product.querySelector(".price-value").innerText = product.getAttribute("data-price");

            var sizeArray = product.getAttribute("data-size").split(",")
            sizeArray.forEach(function (size) {
                let block = document.createElement("div");
                block.textContent = size;
                block.setAttribute('class', 'product-size');
                product.querySelector(".product-info").appendChild(block);
            });

            // var colorArray = product.getAttribute("data-color").split(",");
            // colorArray.forEach(function(color) {
            //     let block = document.createElement("div");
            //     block = document.createElement("div");
            //     block.innerHTML = "";
            //     block.setAttribute('class', 'product-color');
            //     product.querySelector(".product-info").appendChild(block);
            // })
        }
    }
});
