function layerOpen(title, content) {
	const t = $('.layer');
	t.find('.layer-head__title').text(title);
	t.find('.layer-body').load(content);
	t.addClass('is-active');
}
function layerClose() {
	$('.layer').removeClass('is-active');
}

function sideOpen() {
	$('.side').removeClass('un-active');
}

function sideClose() {
	$('.side').addClass('un-active');
}
$(function(){
	let didScroll;
	let lastScrollTop = 0;
	let delta = 5;
	$(window).scroll(function(event) {
	    didScroll = true;
	});
	setInterval(function() {
	    if (didScroll) {
	        hasScrolled();
	        didScroll = false;
	    }
	}, 250);

	function hasScrolled() {
	    var st = $(this).scrollTop();
	    if (Math.abs(lastScrollTop - st) <= delta) return;
	    if (st > lastScrollTop && st > 0) {
	        $('.gnb, .logo, .side-open').removeClass('is-sticky').addClass('un-sticky');
	    } else {
	        if (st + $(window).height() < $(document).height()) {
	            $('.gnb, .logo, .side-open').removeClass('un-sticky').addClass('is-sticky');
	        }
	    }
	    lastScrollTop = st;
	}
})
$(function(){
	$('.side-tab__btn').click(function(){
		const t = $(this).data('type');
		$('.side-tab__btn, .side-content').removeClass('is-active');
		$(this).addClass('is-active');
		if($('.side-content').hasClass(t)){
			$('.side-content.'+t).addClass('is-active');
		}
	});
	$('.main').fullpage({
		licenseKey:'4308785C-54A04031-93B85718-87943952',
		menu: '.gnb',
		anchors: ['home', 'product', 'howto', 'map', 'contactus'],
		navigation:false,
        fitToSection: false,
		scrollingSpeed: 600,
		scrollHorizontally: true,
		responsiveWidth: 1440,
		responsiveHeight: 870,
		normalScrollElements: '.layer, .side',
	});
	$('.product__slide').slick({
		infinite: true,
		dots: true,
		arrows: true,
		autoplay: true,
		autoplaySpeed:9000,
		vertical: true,
		appendArrows: $('.product__slide-ctr'),
		appendDots: $('.product__slide-ctr'),

	});
	$('.product__slide-ctr__play').click(function(){
		$(this).toggleClass('is-play');
		if ($(this).hasClass('is-play')) {
			isPause = true;
			$('.product__slide').slick('slickPause');
		} else {
			isPause = false;
			$('.product__slide').slick('slickPlay');
		}
	});
	$('.howto__thumb').click(function(){
		$(this).toggleClass('is-active');
	})
});
$(function(){
	$('.side-join__form').validate({
		rules: {
			joinPWCheck: {equalTo: joinPW},
			joinTel: {tel: true},
			joinPhone: {tel: true},
			joinMail: {email: true},
			joinPolicy: {required: true}
		},
		errorElement: 'p',
		errorPlacement: function(error, element) {
			error.addClass( 'form-item__err' );
			if ( element.prop( 'type' ) === 'checkbox' ) {
				error.insertAfter( element.parent( 'label' ) );
			} else {
				error.insertAfter( element );
			}
		},
		submitHandler: function(form){
			alert('회원가입에 성공하였습니다.');
			$(form)[0].reset();
		}
	});
	$('.side-login__form').validate({
		errorElement: 'p',
		errorPlacement: function(error, element) {
			error.addClass( 'form-item__err' );
			error.insertAfter( element );
		},
		submitHandler: function(form){
			alert('로그인에 성공하였습니다.');
			$(form)[0].reset();
		}
	});
	//validate kr
	$.extend( $.validator.messages, {
		required: '필수 항목입니다.',
		remote: '항목을 수정하세요.',
		email: '유효하지 않은 E-Mail주소입니다.',
		url: '유효하지 않은 URL입니다.',
		date: '올바른 날짜를 입력하세요.',
		dateISO: '올바른 날짜(ISO)를 입력하세요.',
		number: '유효한 숫자가 아닙니다.',
		digits: '숫자만 입력 가능합니다.',
		creditcard: '신용카드 번호가 바르지 않습니다.',
		equalTo: '비밀번호가 다릅니다.',
		extension: '올바른 확장자가 아닙니다.',
		maxlength: $.validator.format( '{0}자를 넘을 수 없습니다. ' ),
		minlength: $.validator.format( '{0}자 이상 입력하세요.' ),
		rangelength: $.validator.format( '문자 길이가 {0} 에서 {1} 사이의 값을 입력하세요.' ),
		range: $.validator.format( '{0} 에서 {1} 사이의 값을 입력하세요.' ),
		max: $.validator.format( '{0} 이하의 값을 입력하세요.' ),
		min: $.validator.format( '{0} 이상의 값을 입력하세요.' )
	});
	//빈값체크
	$.validator.addMethod('extraMethod', function (value, element) {
		if(value != '') {
			return true;
		} else {
			return false;
		}
	},'값이 없습니다.');
	//연락처체크
	$.validator.addMethod('tel', function (tel_number, element) {
		tel_number = tel_number.replace(/\s+/g, '');
		return this.optional(element) || tel_number.length > 9 && tel_number.match(/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/);
	}, '연락처 형식이 올바르지 않습니다.');
	//숫자와 하이픈 표시
	function isNumberOrHyphen(obj) {
		var exp = /[^0-9-]/g;
		if (exp.test(obj.value)) {
			alert('숫자와 '-'만 입력가능합니다.');
			obj.value = '';
			obj.focus();
		}
	};
	// 전화번호에 하이픈 찍어주기
	function cvtPhoneNumber(obj) {
		var exp = /-/g;
		var number = obj.value.replace(exp, '');
		var revNumber = reverse(number);
		if (obj.value.length > 2) {
			if (number.substring(0, 2) == '02') {
				obj.value = number.substring(0, 2) + '-' + insertHyphen(number.substring(2));
			} else if (obj.value.length > 3 && number.substring(0, 2) != '02' && number.substring(0, 1) == '0') {
				obj.value = number.substring(0, 3) + '-' + insertHyphen(number.substring(3));
			} else if (obj.value.length > 4 && number.substring(0, 1) != '0') {
				obj.value = number.substring(0, 4) + '-' + insertHyphen(number.substring(4));
			}
		}
	};
})