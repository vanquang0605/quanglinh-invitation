$(function () {
	// Get the current URL
	const urlParams = new URLSearchParams(window.location.search);

	// Retrieve the guestname parameter
	const id = urlParams.get('id');

    const API_KEY = 'AIzaSyDHmP00HINuJljo10O9GFeSKHtNVtTyEeo';  // Thay bằng API key của bạn
    const SHEET_ID = '1j3M9VPC4nWFJodF-5tMcNPSf3DuCLS37JLWnjr6GDFM';  // Thay bằng ID của Google Sheets
    const RANGE = 'Generator_Invitation_Card!A2:E999'; // Đọc các dòng từ A2 đến F10 (các cột liên quan)

    const URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;

    fetch(URL)
      .then(response => response.json())
      .then(data => {
        const rows = data.values;
        let result = null;
        
        // Tìm kiếm searchID trong cột A (A2 đến dòng cuối cùng có giá trị)
        for (let i = 0; i < rows.length; i++) {
          if (rows[i][0] === id) {
            result = {
              row: i + 2, // Trả về số dòng tìm thấy (vì bắt đầu từ A2)
              guestName: rows[i][1],
              lunchType: rows[i][2],
              lunchDate: rows[i][3],
              lunchTime: rows[i][4],
            };
            break;
          }
        }

        if (result) {
            console.log('Data found:', result);
          
            // Check if guestname exists
        	if (result.guestName) {
        		$(".guest-name").text(" " + result.guestName + " ");
        	} else {
        		$(".guest-name").text(" ");
        	}
        
        	// Check if lunchType exists
			console.log("result.lunchType: ", result.lunchType);
        	if (result.lunchType == "Nhà trai") {
        		$(".lunchType").text("TẠI TƯ GIA NHÀ TRAI");
        		$("#lunchAddress").text("Nhà Văn Hóa Thôn Chúc Đồng 1 - Xã Thụy Hương - Huyện Chương Mỹ - Thành phố Hà Nội");
        		$("#weddingType").text("LỄ THÀNH HÔN");
        		$("#weddingTime").text("14h00");
				$('#groom_name').show();
				$('#bride_name').hide();
				$('#groom_house').show();
				$('#bride_house').hide();
				$('#groom_invivation').show();
				$('#bride_invivation').hide();
        	} else if (result.lunchType == "Nhà gái") {
        		$(".lunchType").text("TẠI TƯ GIA NHÀ GÁI");
        		$("#lunchAddress").text("Hồ Sen Thôn Lam Điền - Xã Lam Điền - Huyện Chương Mỹ - Thành phố Hà Nội");
        		$("#weddingType").text("LỄ THÀNH HÔN");
        		$("#weddingTime").text("13h30");
				$('#groom_name').hide();
				$('#bride_name').show();
				$('#groom_house').hide();
				$('#bride_house').show();
				$('#groom_invivation').hide();
				$('#bride_invivation').show();
        	}
        
        	// Check if lunchDate exists
        	if (result.lunchDate == 2) {
        		$("#lunchDate").text(result.lunchDate);
        		$("#DOW").text("THỨ BẢY");
        		$("#lunchDate1").text("02");
        	} else if (result.lunchDate == 3) {
        		$("#lunchDate").text(result.lunchDate);
        		$("#DOW").text("CHỦ NHẬT");
        		$("#lunchDate1").text("03");
        	}
        
        	// Check if lunchTime exists
        	if (result.lunchTime) {
        		$("#lunchTime").text(result.lunchTime);
        	}
        } else {
          console.log('ID not found');
		  $('#groom_name').show();
		  $('#bride_name').hide();
		  $('#groom_house').show();
		  $('#bride_house').hide();
		  $('#groom_invivation').show();
		  $('#bride_invivation').hide();
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });


	// Gọi hàm tạo hoa rơi sau mỗi 500ms
	setInterval(createFlower, 500);
});

$(window).on('load', function () {
	// Thêm class 'loaded' vào body để hiển thị nội dung
	$('body').addClass('loaded');

	$('.line').each(function (index) {
		// Dùng setTimeout để tạo độ trễ gối đầu giữa các dòng
		setTimeout(() => {
			$(this).addClass('show'); // Thêm lớp 'show' để hiện dòng chữ
		}, 200 * index); // Gối đầu sau 0.3 giây (300ms) giữa các dòng
	});
});

function createFlower() {
	// Tạo hình ảnh cánh hoa
	const flower = $('<img src="./images/heart.png" class="flower" />');
	$('body').append(flower);

	// Đặt vị trí ngẫu nhiên cho cánh hoa rơi từ phía trên
	const startLeft = Math.random() * window.innerWidth - 30;
	const fallTime = Math.random() * 4 + 8; // Tốc độ rơi từ 3 đến 6 giây
	const size = Math.random() * 20 + 20; // Kích thước hoa từ 20px đến 40px

	flower.css({
		left: `${startLeft}px`,
		width: `${size}px`,
		height: `${size}px`,
		opacity: 0.6,
		animation: `fall ${fallTime}s linear`,
		top: `-50px`, // Bắt đầu từ phía trên cùng
		position: 'fixed'
	});

	// Sau khi hoa rơi xong, xóa khỏi DOM
	setTimeout(() => {
		flower.remove();
	}, fallTime * 1000);
}
