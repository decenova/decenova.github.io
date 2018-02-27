var y = 0;
        var count = 1,
            c = 0;
        var flag = true,
            isPara = true;
        var id, idscroll;
        var patternName = /^[a-zA-Z]+([a-zA-Z\s]+)*$/;
        var patternPhone = /^[0-9]{10,11}$/;
        var patternEmail = /^[a-zA-Z0-9]+[@][a-zA-Z]+[.][a-z]+([.][a-z]+)*$/;

        function control(){
            setInfor();
            if (isPara) {
                para();
                navColor();   
            } else {
                paraPhone();
            }
        }
        function setControl(){
            if (innerWidth <= 768){
                isPara = false;
            } else {
                isPara = true;
            }
            
        }
        function para() {
            y = window.pageYOffset;
            paraV("logosword", 70, 0, 0, 450);
            paraVRev("equi2", 0, 50, 600, 1000);
            paraVRev("equi1", 0, 40, 650, 1000);
            paraV("story1", 100, 50, 600, 1200);
            paraV("story2", 10, 50, 600, 1200);
            paraV("story4", 90, 50, 600, 1200);
            paraV("story5", 0, 50, 600, 1200);
            paraHLeft("mikasa1", 40, 0, 1100, 2000);
            paraHLeft("mikasa2", 40, 0, 1100, 2000);
            paraHRight("Action1", 0, 10, 1200, 2000);
            paraHRight("Action2", 0, 10, 1200, 2000);
            if (y >= 2000 && flag) {
                flag = false;
                situRun(1);
                document.getElementById("situ5").style.width = "200px";
            }
            paraV("a2-2", 10, 90, 2300, 3500);
            //            paraV("a2-1", 20, 80, 2300, 3500);
            //            paraV("a2-3", 20, 80, 2300, 3500);
            paraVRev("a5-2", 10, -10, 3500, 4600);
            diskRun(90, 0, 4000, 5200);
        }
        function paraPhone() {
            y = window.pageYOffset;
            paraV("logosword", 70, 0, 0, 150);
            paraVRev("equi2", 0, 50, 0, 300);
            paraVRev("equi1", 0, 40, 0, 300);
            paraV("story1", 50, 80, 0, 600);
            paraV("story2", 50, 30, 0, 600);
            paraV("story4", 50, 70, 0, 600);
            paraV("story5", 50, 20, 0, 600);
            paraHLeft("mikasa1", 40, 0, 300, 1100);
            paraHLeft("mikasa2", 40, 0, 300, 1100);
            paraHRight("Action1", 0, 10, 300, 1100);
            paraHRight("Action2", 0, 10, 300, 1100);
        }
//cart
        function setInfor() {
            if (localStorage.getItem("quantity") == null || localStorage.getItem("quantity") == "undefined")
                localStorage.setItem("quantity", 0);
        }
        function add(code, name, picture, cost, height, width, scale, weight) {
            if (find(code) == -1) {
                var q = localStorage.getItem("quantity");
                q++;
                localStorage.setItem("quantity", q);
                localStorage.setItem(q, code + "-" + name + "-" + picture + "-" + cost + "-1-" + height + "-" + width + "-" + scale + "-" + weight);
                snackbarShow("Add successful!");
            } else {
                snackbarShow("You had add this item!");
            }
        }
        function find(code) {
            var q = localStorage.getItem("quantity");
            for (var i = 1; i <= q; i++) {
                var tmp = localStorage.getItem(i);
                if (tmp != null && tmp != "undefined") {
                    if (tmp.match("^" + code + "-") != null)
                        return i;
                }
            }
            return -1;
        }
        function cartOpen() {
            var totalCost = 0;
            var s = '';
            var money = 0;
            var q = localStorage.getItem("quantity");
            backRun();
            for (var i = 1; i <= q; i++) {
                var tmp = localStorage.getItem(i);
                if (tmp != null && tmp != "undefined") {
                    var arr = tmp.split("-");
                    s += '<div class="containClose" id="con' + arr[0] +'">';
                    s += "<div class='li' onclick='detailRun(\"" + arr[0] + "\")'>";
                    s += '<div class="tdetail" id="' + arr[0] + '">';
                    s += '<h2>' + arr[1] + '</h2>';
                    s += '<hr/><br/>';
                    if (arr[0] == "d001") {
                        s += '<p>This disk only run on PS4, PS3, xBox360 and PC</p>';
                    } else {
                        s += '<p>Height: ' + arr[5] + 'mm</p>';
                        s += '<p>Width: ' + arr[6] + 'mm</p>';
                        s += '<p>Scale: ' + arr[7] + '</p>';
                        s += '<p>Weight: ' + arr[8] + '</p>';
                    }
                    s += '<div class="cancel" onclick="removeProduct(\'' + arr[0] + '\')"></div></div>';
                    s += '<div class="t"><div class="tthum">';
                    s += '<img src="' + arr[2] + '" class="t1"/>';
                    s += '<img src="Image/Detail.png" class="t2">';
                    s += '</div><h1>' + arr[3] + '$</h1></div></div>';
                    s += '<div class="number">';
                    s += '<input type="number" value="' + arr[4] + '" min="1" max="5" onchange="update(\'' + arr[0] + '\', this)"/>';
                    s += '</div></div>';
                    totalCost += arr[3] * arr[4];
                }
            }

            document.getElementById("c3ul").innerHTML = s;
            document.getElementById("c4-2").innerHTML = totalCost.toFixed(2) + "$";
            document.getElementById("c").style.display = "block";
        }
        function update(code, tag){
            if (tag.value > 5 || tag.value < 1) {
                tag.value = 1;
            }
            tag.value = Math.round(tag.value);
            var i = find(code);
            if (i != -1){
                var tmp = localStorage.getItem(i);
                if (tmp != null || tmp != "undefined") {
                    var arr = tmp.split("-");
                    arr[4] = tag.value;
                    localStorage.setItem(i, arr[0] + "-" + arr[1] + "-" + arr[2] + "-" + arr[3] + "-" + arr[4] + "-" + arr[5] + "-" + arr[6] + "-" + arr[7] + "-" + arr[8]);
                }
                cartOpen();
            }
        }
        function removeProduct(code) {
            var i = find(code);
            if (i != -1) {
                localStorage.removeItem(i);
                cartOpen();
                snackbarShow("Remove item successful!");
            }
        }
        function cartClose() {
            document.getElementById("c").style.display = "none";
        }
        function backRun(){
            document.getElementById("c3form").className = "c3formClose"; 
        }
        function finish() {
            var tag = document.getElementById("c3form");
            var tag2 = document.getElementById("c3ul");
            if (tag.className == "c3formClose"){
                if (tag2.childElementCount <= 0) {
                    snackbarShow("The cart is empty!");
                    return true;
                }
                tag.className = "c3formOpen";
                return true;
            }
            if (check() == false)
                return false;
            snackbarShow("Succcessful! We will contact you soon!");
            var q = localStorage.getItem("quantity");
            for (var i = 1; i <= q; i++){
                localStorage.removeItem(i);
            }
            localStorage.setItem("quantity", 0);
            cartOpen();
            return true;
        }
        function check() {
            if (document.f.txt5.checked == false) {
                snackbarShow('You have to checked "I am sure my personal information is accurate and up to date."');
                return false;
            }
            if (checkName() && checkPhone() && checkEmail() && checkAddress()){
                return true;
            }
            return false;
        }
        function checkName(){
            if (patternName.test(document.f.txt1.value) == false) {
                snackbarShow("You have to input name!");
                document.f.txt1.focus();
                return false;
            }
            return true;
        }
        function checkPhone(){
            if (patternPhone.test(document.f.txt2.value) == false) {
                snackbarShow("Phone number must have 10-11 digits!");
                document.f.txt2.focus();
                return false;
            }
            return true;
        }
        function checkEmail(){
            if (patternEmail.test(document.f.txt3.value) == false) {
                snackbarShow("Email must like \"Example@gmail.com\"!");
                document.f.txt3.focus();
                return false;
            }
            return true;
        }
        function checkAddress(){
            if (/[a-zA-Z0-9]+/.test(document.f.txt4.value) == false) {
                snackbarShow("You must fill in your address!");
                document.f.txt4.focus();
                return false;
            }
            return true;
        }
//snackbar 
        function snackbarShow(s){
            var tag = document.getElementById("snackbarbox");
            tag.style.visibility = "visible";
            var d = document.createElement("DIV");
            d.className = 'snackbar';
            d.style.animation = "slide 4s 1";
            d.appendChild(document.createTextNode(s));
            tag.appendChild(d);
            setTimeout("snackbarOff()", 3500);
        }
        function snackbarOff() {
            var tag = document.getElementById("snackbarbox");
            var check = tag.childElementCount;
            if (tag.hasChildNodes()) {
                tag.removeChild(tag.childNodes[0]);
            }
            if (tag.childElementCount == check) {
                tag.removeChild(tag.childNodes[0]);
            }
        }
//detail
        function detailRun(tagId) {
            var tag1 = document.getElementById(tagId);
            var tag2 = document.getElementById("con" + tagId);
            if (tag1 == null)
                return;
            if (tag2.className == 'containClose') {
                tag2.className = 'containOpen';
                tag1.className = 'tdetailOpen';
            } else {
                tag2.className = 'containClose';
                tag1.className = 'tdetail';
            }
        }
//nav
        function navColor() {
            if (y < 800) {
                navResetColor();
                document.getElementById("btn1").style.backgroundColor = "#eee";
            } else if (y >= 800 && y < 1400) {
                navResetColor();
                document.getElementById("btn2").style.backgroundColor = "#eee";
            } else if (y >= 1400 && y < 2000) {
                navResetColor();
                document.getElementById("btn3").style.backgroundColor = "#eee";
            } else if (y >= 2000 && y < 2680) {
                navResetColor();
                document.getElementById("btn4").style.backgroundColor = "#eee";
            } else if (y >= 2680 && y < 3300) {
                navResetColor();
                document.getElementById("btn5").style.backgroundColor = "#eee";
            } else if (y >= 3300 && y < 3900) {
                navResetColor();
                document.getElementById("btn6").style.backgroundColor = "#eee";
            } else if (y >= 3900 && y < 4500) {
                navResetColor();
                document.getElementById("btn7").style.backgroundColor = "#eee";
            } else if (y >= 4500) {
                navResetColor();
                document.getElementById("btn8").style.backgroundColor = "#eee";
            }
        }
        function navOver(tag) {
            tag.style.backgroundColor = "#eee";
        }
        function navResetColor() {
            for (var i = 2; i <= 8; i++) {
                document.getElementById("btn" + i).style.backgroundColor = "#777";
            }
        }
        function nav(pos) {
            var step = (pos - window.pageYOffset) * 1.0 / 50;
            var time = 50;
            var tmp = Math.abs(step);
            if (tmp < 20) {
                step = step / tmp * 20;
                time = Math.abs(pos * 1.0 - window.pageYOffset) / 20;
            }
            navStop();
            document.body.addEventListener("mousewheel", navStop);
            idscroll = setInterval("navScroll(" + step + "," + time + "," + pos + ")", 20);
        }
        function navScroll(step, time, pos) {
            c++;
            if (c > time) {
                window.scrollTo(0, pos);
                c = 0;
                clearInterval(idscroll);
                return;
            }
            window.scrollBy(0, step);
        }
        function navStop() {
            c = 0;
            document.body.removeEventListener("mousewheel", navStop);
            clearInterval(idscroll);
        }
//class type
        function changeClass(type) {
            var hp = document.getElementById("hp");
            var mana = document.getElementById("mana");
            var speed = document.getElementById("speed");
            var classname = document.getElementById("classname");
            var classdetail = document.getElementById("classdetail");
            var classimg = document.getElementById("classimg");
            var classchose = document.getElementById("classchose");
            switch (type) {
            case 1:
                hp.style.width = "80%";
                mana.style.width = "40%";
                speed.style.width = "60%";
                classname.innerHTML = "SABER";
                classdetail.innerHTML = "Strong and fast. She is the King of Knights. Saber has the appearance of a young woman in her late teens with a slender physique and soft, white skin.";
                break;
            case 2:
                hp.style.width = "40%";
                mana.style.width = "60%";
                speed.style.width = "80%";
                classname.innerHTML = "ARCHER";
                classdetail.innerHTML = "Hiding in the dark, he will kill all enemies silently. He was known as Faker of CITY. \"Run away from me? You can't.\"";
                break;
            case 3:
                hp.style.width = "50%";
                mana.style.width = "90%";
                speed.style.width = "40%";
                classname.innerHTML = "CASTER";
                classdetail.innerHTML = "Intelligent is her strengh. With her staff, no enemies can't touch her. Caster's appearance is much like a witch that would be seen in a fairy tale.";
                break;
            }
            classimg.src = "Image/" + type + "Class.png";
            classchose.src = "Image/Class" + type + ".png";
        }
//story
        function situRun(num) {
            document.getElementById("situ" + num).style.transform = "translateX(0%)";
            if ((num + 1) > 4)
                return;
            else
                id = setTimeout("situRun(" + ++num + ")", 500);
        }
//background
        function bgrun(num) {
            for (var i = 1; i <= 4; i++) {
                if (i == num) {
                    document.getElementById("bg" + i).style.opacity = "1";
                    document.getElementById("bgbutton" + i).style.outline = "3px solid #fc0";
                } else {
                    document.getElementById("bg" + i).style.opacity = "0";
                    document.getElementById("bgbutton" + i).style.outline = "none";
                }
            }

        }
//disk
        function diskRun(pos1, pos2, start, end) {
            var tag = document.getElementById("disk");
            if (y < start || y > end)
                return;
            tag.style.transform = "translateX(50%) translateY(30%) rotate(-" + (pos1 + (y - start) * (0 - pos2 - pos1) / (end - start)) + "deg)"
        }
//para
        function paraV(tagId, pos1, pos2, start, end) {
            var tag = document.getElementById(tagId);
            if (y < start || y > end)
                return;
            tag.style.transform = "translateX(-50%) translateY(-" + (pos1 + (y - start) * (pos2 - pos1) / (end - start)) + "%)"
        }
        function paraVRev(tagId, pos1, pos2, start, end) {
            var tag = document.getElementById(tagId);
            if (y < start || y > end)
                return;
            tag.style.transform = "translateX(-50%) translateY(" + (pos1 + (y - start) * (pos2 - pos1) / (end - start)) + "%)"
        }
        function paraHLeft(tagId, pos1, pos2, start, end) {
            var tag = document.getElementById(tagId);
            if (y < start || y > end)
                return;
            tag.style.transform = "translateX(" + (pos1 + (y - start) * (pos2 - pos1) / (end - start)) + "%)"
        }
        function paraHRight(tagId, pos1, pos2, start, end) {
            var tag = document.getElementById(tagId);
            if (y < start || y > end)
                return;
            tag.style.transform = "translateX(" + (pos1 + (y - start) * (pos2 - pos1) / (end - start)) + "%)"
        }