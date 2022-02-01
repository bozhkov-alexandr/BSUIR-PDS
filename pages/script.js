'use strict'

function inintFunction() {

  // Limit inputs max length

  const donationValue = document.querySelectorAll('.donation-input');
  const cardNumInput = document.querySelector('.card-number-input');
  const cvvInput = document.querySelector('.cvv');
  const eventCodes = ['Minus', 'Equal', 'NumpadAdd', 'NumpadSubtract'];
  const amountBtns = ['.donation-input', '.card-number-input', '.card-number-input', '.cvv'];

  function limitValueLength(event) {
    limitLength(event.target, 4);
  }

  function limitCardNumLength(event) {
    limitLength(event.target, 16);
  }

  function limitCvvLength(event) {
    limitLength(event.target, 3);
  }

  function removSymbols(event) {
    if (!amountBtns.some( btn => event.target.matches(btn))) return;
    const code = event.code;
    if (eventCodes.some( event => event === code)) {
      event.preventDefault();
      return;
    }
    if (event.code === 'ArrowDown' && (!event.target.value || event.target.value <= 0)) {
      event.preventDefault();
    }
  }

  function limitLength(elem, length) {
    const amount = elem.value;
    if(amount > length) {
      elem.value=amount.substr(0, length);
    };
  }

  donationValue.forEach( input => input.addEventListener('input', limitValueLength));
  cardNumInput.addEventListener('input', limitCardNumLength)
  cvvInput.addEventListener('input', limitCvvLength)
  document.addEventListener('keydown', removSymbols);

  // Menu-burger

  const menuBurger = document.querySelector('.menu-burger');
  const menuCloseButton = document.querySelector('.header-content .navigation .close-btn');
  const navigationMenu = document.querySelector('.header-content .navigation');

  function shownNavigationMenu(event) {
    event.preventDefault();
    const navigationMenu = document.querySelector('.header-content .navigation');
    navigationMenu.classList.add('opened-menu');
  }

  function closeNavigationMenu(event) {
    event.preventDefault();
    const navigationMenu = document.querySelector('.header-content .navigation');
    navigationMenu.classList.toggle('opened-menu');
  }

  menuBurger.addEventListener('mousedown', shownNavigationMenu);
  menuBurger.addEventListener('touchstart', shownNavigationMenu);
  menuCloseButton.addEventListener('mousedown', closeNavigationMenu);
  menuCloseButton.addEventListener('touchstart', closeNavigationMenu);

  // Pop up

  const modalWrapper = document.querySelector('.make-a-donation-wrapper');
  const modal = document.querySelector('.make-a-donation');

  function showPopup(event) {
    if (event.target.dataset.modal !== 'modal') return;
    modalWrapper.classList.add('pop-up-wrapper-active');
    modal.classList.add('pop-up-active');
    document.body.classList.add('notScrollable');
  }

  function hidePopup(event) {
    if (!event.target.matches('.close-btn-svg') && !event.target.matches('.make-a-donation-wrapper')) return;
    modalWrapper.classList.remove('pop-up-wrapper-active');
    modal.classList.remove('pop-up-active');
    document.body.classList.remove('notScrollable');
  }

  document.addEventListener('click', showPopup); 
  document.addEventListener('click', hidePopup); 

  // Donate pop up

  const donateModalWrapper = document.querySelector('.donation-pop-up-wrapper'); 
  const donateModal = document.querySelector('.donation-pop-up');
  const stepsArray = document.querySelectorAll('.step'); 
  const donationBtns = document.querySelector('.donation-buttons'); 
  const nextStepBtns = document.querySelectorAll('.next-step-btn');
  const prevStepBtns = document.querySelectorAll('.back-button');
  const donationForm = document.querySelector('.donation-form');
  const submitBtn = document.querySelector('.donation-submit'); 
  const mdAmountInput = document.querySelector('.input-item-amount');
  const mdAmountRadioBtns = document.querySelectorAll('.amount-buttons-item');
  const initStepsPos = {
    'step' : 0,
  };

  function revertStepPos(obj) {
    obj.step = 0;
  }

  function updateStepsPos() {
    stepsArray.forEach( step => {
      const posLeft = initStepsPos.step;
      step.style.transform = `translateX(${posLeft * 100}%)`;
    });
  }

  function showDonationPopup(event) {
    if (!event.target.matches('.quick-donate')) return;
    const donationValue = document.querySelector('.donation-amount').value;
    const mdAmountRadioBtn = document.querySelector('#amount-10');
    mdAmountInput.value = donationValue;
    donateModalWrapper.classList.add('pop-up-wrapper-active');
    donateModal.classList.add('pop-up-active');
    document.body.classList.add('notScrollable');
    if (donationValue) {
      mdAmountRadioBtns.forEach(input => input.checked = false);
      setTimeout(() => mdAmountInput.focus(), 200);
    } else {
      mdAmountRadioBtn.checked = true;
    }
  }

  function hideDonationPopup(event) {
    if (!event.target.matches('.donation-pop-up-wrapper')) return;
    donateModalWrapper.classList.remove('pop-up-wrapper-active');
    donateModal.classList.remove('pop-up-active');
    document.body.classList.remove('notScrollable');
    revertStepPos(initStepsPos);
    updateStepsPos();
  }

  function disableAmountBtns(event) {
    if (!event.target.matches('.amount-buttons-item') && !event.target.matches('.input-item-amount')) return;
    if (event.target.checked) {
      mdAmountInput.value = '';
      return;
    } else if (event.target.value) {
      mdAmountRadioBtns.forEach( input => input.checked = false);
    }
  }

  // updateStepsPos();
  document.addEventListener('click', showDonationPopup); 
  document.addEventListener('click', hideDonationPopup); 
  document.addEventListener('input', disableAmountBtns); 

  // Make-a-donation => Donation-pop-up

  function makeDonation(event) {
    if (!event.target.matches('.pop-up-button')) return;
    const amount = event.target.dataset.amount;
    const mdAmountButton = document.querySelector(`#${amount}`);
    modalWrapper.classList.remove('pop-up-wrapper-active');
    modal.classList.remove('pop-up-active');
    donateModalWrapper.classList.add('pop-up-wrapper-active');
    donateModal.classList.add('pop-up-active');
    mdAmountInput.value = '';
    mdAmountButton.matches('.input-item-amount') ? setTimeout(() => mdAmountInput.focus(), 200) : mdAmountButton.checked = true;
  }

  donationBtns.addEventListener('click', makeDonation);

  // Select donation form page

  function showNextStep(event) {
  event.preventDefault();
  initStepsPos.step -= 1;
  updateStepsPos();
  }

  function showPreviousStep(event) {
    event.preventDefault();
    initStepsPos.step += 1;
    updateStepsPos();
  }

  nextStepBtns.forEach( button => button.addEventListener('click', showNextStep));
  prevStepBtns.forEach( button => button.addEventListener('click', showPreviousStep));

  //  Submit donation & validation form

  const creditCard = {
    'creditCardNumFields' : {
      'card-number-input' : /^[0-9_]{13,16}$/,
      'cvv' :  /^[0-9_]{3}$/,
    },

    'creditCardFields' : ['.cardholder', '.select-area-month', '.select-area-year'],
  }

  function validateDonationAmount() {
    const amounBtnsArr = Array.from(mdAmountRadioBtns);
    return mdAmountInput.value ? true : amounBtnsArr.some(btn => btn.checked);
  }

  function validateEmail() {
    const email = document.querySelector('.email-input-item').value;
    const reg = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    return reg.test(email);
  }

  function validateCreditCard() {
    return validateNum(creditCard.creditCardNumFields) && validateFields(creditCard.creditCardFields) ? true : false;
  }

  function validateForm() {
    if(!validateDonationAmount() || !validateEmail() || !validateCreditCard()) {
      submitBtn.classList.remove('submit-button-active');
      submitBtn.dataset.validate = false;
      return ;
    }
    submitBtn.classList.add('submit-button-active');
    submitBtn.dataset.validate = true;
  }

  function submitForm(event) {
    event.preventDefault();
    if(submitBtn.dataset.validate !== 'true') return;
    donateModalWrapper.classList.remove('pop-up-wrapper-active');
    donateModal.classList.remove('pop-up-active');
    document.body.classList.remove('notScrollable');
    revertStepPos(initStepsPos);
    updateStepsPos(0);
    donationForm.reset();
    submitBtn.dataset.validate = false;
    setTimeout( () => alertMessage('Thank you for your donation'), 300);
  }

  function alertMessage(message) {
    alert(message);
  }

  function validateNum(obj) {
    return Object.keys(obj).every( key => {
      const value = document.querySelector(`.${key}`).value;
      const reg = obj[key];
      return reg.test(value);
    })
  }
 
 function validateFields(arr) {
   return arr.every( elem => document.querySelector(elem).value);
 }

  donationForm.addEventListener('change', validateForm);
  submitBtn.addEventListener('click', submitForm);

  //

  function valCardNum() {
    const email = document.querySelector('.card-number-input').value;
    const reg = /^[0-9_]{13,16}$/;
    return reg.test(email);
  }

  function valCardCvv() {
    const email = document.querySelector('.cvv').value;
    const reg = /^[0-9_]{3}$/;
    return reg.test(email);
  }

  const requiredInputs = document.querySelectorAll('.required');

  function validateField(event) {
    if (event.target.matches('.email-input-item') && !validateEmail()) {
     event.target.classList.add('input-item-invalid');
    } else if (event.target.matches('.cardholder') && !event.target.value) {
      event.target.classList.add('input-item-invalid');
    } else if (event.target.matches('.card-number-input') && !valCardNum()) {
      event.target.classList.add('input-item-invalid');
    } else if (event.target.matches('.cvv') && !valCardCvv()) {
      event.target.classList.add('input-item-invalid');
    } else {
      event.target.classList.remove('input-item-invalid');
    }
  }

  requiredInputs.forEach(input => input.addEventListener('change', validateField));


  // Choosing option 

  const selectInputs = donationForm.querySelectorAll('.select-area');

  function changeLabelsStyle(event) {
    const headLabel = event.target.parentNode;
    const labelChooseFavour = headLabel.parentNode.querySelector('.choose-favour-label');
    event.target.value ? headLabel.classList.add('disabled-label') : headLabel.classList.remove('disabled-label');
    if (labelChooseFavour) {
      event.target.value ? labelChooseFavour.classList.add('active-label') : labelChooseFavour.classList.remove('active-label');
    }
  }

  selectInputs.forEach(input => input.addEventListener('input', changeLabelsStyle));

  // Carousel

  class SliderCarousel {

    constructor(setting) {
      this.setting = setting;

      this.sel = {
      'main': document.querySelector(this.setting.main),
      'wrap': document.querySelectorAll(this.setting.wrap),
      'children': document.querySelectorAll(this.setting.children),
      'prev': document.querySelector(this.setting.prev),
      'next': document.querySelector(this.setting.next)
      };

      this.opt = {
      'position': 0,
      'maxPosition': document.querySelectorAll(this.setting.wrap)[0].children.length,
      'step' : this.sel.children[0].offsetWidth + parseFloat(getComputedStyle(this.sel.children[0]).marginRight),
      'transition' : 'transform 0.5s ease-out',
    };

    this.opt.maxVisibleAmount = Math.floor( (this.sel.wrap[0].offsetWidth + parseFloat(getComputedStyle(this.sel.children[0]).marginRight) ) / this.opt.step);
    
    if (this.sel.prev) {
      this.sel.prev.addEventListener('click', () => {
        this.prevSlide();
      });
    }
    
    if(this.sel.next) {
      this.sel.next.addEventListener('click', () => {
        this.nextSlide();
      });
    }

    }

    prevSlide() {   
      this.opt.position === 0 ? this.opt.position = this.opt.maxPosition - this.opt.maxVisibleAmount : this.opt.position--;
      this.updatePos();
    }
    
    nextSlide() {
      this.opt.position === this.opt.maxPosition - this.opt.maxVisibleAmount ?  this.opt.position = 0 : this.opt.position++;
      this.updatePos();
    };

    updateMaxVisAmount() {
      this.opt.maxVisibleAmount = Math.floor(this.sel.wrap[0].offsetWidth / this.opt.step);
    }

    updateStep() {
      this.opt.step = this.sel.children[0].offsetWidth + parseFloat(getComputedStyle(this.sel.children[0]).marginRight);
    }

    updatePos() {
      this.sel.wrap.forEach( wrap => {
        wrap.style.transition = this.opt.transition;
        wrap.style.transform = `translateX(-${this.opt.position * this.opt.step}px) translateZ(0)`;
      });
    }

    update() {
      this.updateStep();
      this.updateMaxVisAmount();
      this.updatePos();
    }
  }

  class AutoCarousel extends SliderCarousel {
    constructor(setting) {
      super(setting);
      this.opt = {
        'position': 0,
        'maxPosition': parseFloat(getComputedStyle(document.body).getPropertyValue('--grid-col')),
        'step' : this.sel.children[0].offsetWidth + parseFloat(getComputedStyle(this.sel.wrap[0]).gridColumnGap),
        'transition' : 'transform 0.3s ease-out',
      };
      this.opt.maxVisibleAmount = Math.ceil( (this.sel.wrap[0].offsetWidth + parseFloat(getComputedStyle(this.sel.wrap[0]).gridColumnGap)) / this.opt.step);
      this.autoSliding = () => {
        this.opt.position === this.opt.maxPosition - this.opt.maxVisibleAmount ?  this.opt.position = 0 : this.opt.position++;
        this.updatePos();
        this.hideBtn();
      }

      this.autoSlideInterval = setInterval(this.autoSliding, 15000);
      this.autoSlideTimeout = null;

      this.delayAutoSliding = () => {
        clearInterval(this.autoSlideInterval);
        clearTimeout(this.autoSlideTimeout);
        this.autoSlideInterval = null;
        this.autoSlideTimeout = setTimeout(() => {
          clearInterval(this.autoSlideInterval);
          this.autoSlideInterval = setInterval(this.autoSliding, 15000);
        }, 45000);
      }

      this.sel.children.forEach( childe => childe.addEventListener('click', () => {
        this.delayAutoSliding();
      }));

      
    }

    prevSlide() {
    super.prevSlide();
    const hideButton = () =>  this.hideBtn();
    hideButton();
    this.delayAutoSliding();
    }

    nextSlide() {
    super.nextSlide();
    const hideButton = () =>  this.hideBtn();
    hideButton();
    this.delayAutoSliding();
  }

  updateMaxVisAmount() {
    Math.ceil( (this.sel.wrap[0].offsetWidth + parseFloat(getComputedStyle(this.sel.wrap[0]).gridColumnGap)) / this.opt.step);
  }

  updateStep() {
    this.opt.step = this.sel.children[0].offsetWidth + parseFloat(getComputedStyle(this.sel.wrap[0]).gridColumnGap);
  }

  hideBtn() {
    switch (this.opt.position) {
      case 0:
        this.sel.prev.classList.add('btn-visuallyhidden');
        this.sel.next.classList.remove('btn-visuallyhidden');
        break;
      case this.opt.maxPosition - this.opt.maxVisibleAmount :
        this.sel.next.classList.add('btn-visuallyhidden');
        this.sel.prev.classList.remove('btn-visuallyhidden');
        break;
      default:
        this.sel.prev.classList.remove('btn-visuallyhidden');
        this.sel.next.classList.remove('btn-visuallyhidden');
        break;
    }
  }

  }

  const carousel = new SliderCarousel({
  'main': '.slider',
  'wrap': '.slider-row',
  'children': '.slider-item',
  'prev': '.slider-arr-left',
  'next': '.slider-arr-right'
  });

  const reviewCarousel = new AutoCarousel({
  'main': '.review-block',
  'wrap': '.review-wrapper',
  'children': '.review-item',
  'prev': '.left-light',
  'next': '.right-light'
  });

  reviewCarousel.hideBtn();

  window.addEventListener('resize',  () => {
  reviewCarousel.update();
  });

  window.addEventListener('resize',  () => {
  carousel.update();
  });

}

window.addEventListener('DOMContentLoaded', inintFunction);