
function createScan(options = {}) {
  var _currGroup = null;
  var _currSelection = null;
  var _parentSelection = null;
  var _intervalId = null;
  var _self = null;
  var _groupsStack = [];
  var _isScanning = false;
  var _cssGroup = "group-selected";
  var _cssParentGroup = "group-selected-parent";
  var _clickShield = document.createElement("div");
  _clickShield.setAttribute("tabindex", "-1");
  _clickShield.style.position = "fixed";
  _clickShield.style.left = 0;
  _clickShield.style.right = 0;
  _clickShield.style.top = 0;
  _clickShield.style.bottom = 0;
  _clickShield.style.zIndex = 1000;
  _clickShield.style.backgroundColor = "rgba(255,255,255,0)";

  function pushGroupName(groupName) {
    if (groupName == _groupsStack[_groupsStack.length - 1]) return;

    // Reseta a stack no caso de ciclos
    if (_groupsStack.includes(groupName)) { 
      _groupsStack = []
    }
    _groupsStack.push(groupName);
  }

  function popPreviousGroupName() {
    // O primeiro grupo permanece
    if (_groupsStack.length === 1) { 
      return _groupsStack[0];
    }

    // Último grupo é o grupo atual
    _groupsStack.pop();
    var lastIndex = _groupsStack.length - 1;
    return _groupsStack[lastIndex];
  }

  function enableClickShield() {
    document.body.appendChild(_clickShield);
  }

  function disableClickShield() {
    document.body.removeChild(_clickShield);
  }

  function hasNextGroup(element) {
    var nextGroupName = element.getAttribute("data-next-group");
    return nextGroupName != undefined && nextGroupName !== "";
  }

  function goToNextGroup() {
    var nextGroupName = _currSelection.getAttribute("data-next-group");
    if (nextGroupName != undefined && nextGroupName !== "") {
      _self.changeToGroup(nextGroupName);
    }
  }

  function clickListener (ev) {
    if (!_isScanning) return;

    if (ev.target == _clickShield) {
      if (hasNextGroup(_currSelection)){
        _currSelection.click();
        if (_currSelection != null) goToNextGroup();
      } else {
        _currSelection.click();
      }
    }
  }

  function keyDownListener(ev) {
    if (!_isScanning) return;

    if (ev.keyCode == 32 || ev.keyCode == 13) { // Space or enter
      if (hasNextGroup(_currSelection)){
        _currSelection.click();
        if (_currSelection != null) goToNextGroup();
      } else {
        _currSelection.click();
      }
    } else if (ev.keyCode == 27) { // Esc
      _self.changeToGroup(popPreviousGroupName());
    }
  }

  function enableEventListeners() {
    window.addEventListener('click', clickListener);
    window.addEventListener('keydown', keyDownListener);
  }

  function disableEventListeners() {
    window.removeEventListener('click', clickListener);
    window.removeEventListener('keydown', keyDownListener);
  }

  function launchScanLoop () {
    var elmCounter = 0;
    var goBackCounter = 0;
    _intervalId = setInterval(function () {
      if (options.goBack !== undefined && Number.isInteger(options.goBack)) {
        goBackCounter += Math.trunc(elmCounter / _currGroup.length);
        if (goBackCounter == options.goBack) {
          goBackCounter = 0;
          if (_groupsStack.length > 1){
            _self.changeToGroup(popPreviousGroupName());
            return;
          }
        }
      }
      elmCounter = elmCounter % _currGroup.length;
      _currSelection.classList.remove(_cssGroup);
      _currGroup[elmCounter].classList.add(_cssGroup);
      _currSelection = _currGroup[elmCounter];
      elmCounter = elmCounter + 1;
    }, options.interval ? options.interval : 1000);

    _isScanning = true;
  }

  _self = {
    stop: function () {
      clearInterval(_intervalId);
      _currSelection.classList.remove(_cssGroup);
      _currSelection = null;
      if (_parentSelection) { 
        _parentSelection.classList.remove(_cssParentGroup);
      }
      _parentSelection = null;
      disableEventListeners();
      disableClickShield();
      _isScanning = false;
    },

    reset: function (groupNameToScan) {
      this.stop();
      this.start(groupNameToScan);
    },

    changeToGroup: function (groupNameToScan) {
      clearInterval(_intervalId);
      _currGroup = document.querySelectorAll('[data-in-groups~="' + groupNameToScan + '"]');
      if (_currSelection) {
        _currSelection.classList.remove(_cssGroup);
        if (_parentSelection) _parentSelection.classList.remove(_cssParentGroup);
        _parentSelection = _currSelection;
        _parentSelection.classList.add(_cssParentGroup);
      }
      _currSelection = _currGroup[0];
      pushGroupName(groupNameToScan);
      launchScanLoop();
    },

    changeIntervalTime: function (millisec) {
      options.interval = millisec;
      if (_isScanning) {
        clearInterval(_intervalId);
        launchScanLoop();
      }
    },

    isScanning: function () {
      return _isScanning;
    },

    start: function (groupNameToScan) {
      _groupsStack = [];
      pushGroupName(groupNameToScan);
      enableClickShield();
      enableEventListeners();
      _clickShield.focus();
      _currGroup = document.querySelectorAll('[data-in-groups~="' + groupNameToScan + '"]');
      _currSelection = _currGroup[0];

      launchScanLoop();
    }
  };

  return _self;
}


