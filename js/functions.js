/*jslint indent: 4, maxerr: 50, regexp: true */
/*global $, localStorage, alert, console*/


// class
var Calculation = function () {
    'use strict';
};
// static public
Calculation.isStorable = (
    function () {
        'use strict';
        var test = 'test';
        try {
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }()
);
Calculation.clear = function () {
    'use strict';
    if (Calculation.isStorable) {
        localStorage.clear();
    }
};
Calculation.loadValue = function (storageName) {
    'use strict';
    if (Calculation.isStorable) {
        return localStorage[storageName];
    }
};
Calculation.storeValue = function (storageName, storageValue) {
    'use strict';
    if (Calculation.isStorable) {
        localStorage[storageName] = String(storageValue);
    }
};


// class
var CalculationNumber = function () {

    'use strict';

    // private vars and functions
    var $input,
        $identifier,
        $text,
        decimalPlaces = 2,
        dependentList = [],
        followerList = [],
        identifier = '',
        min = '',
        max = '',
        title = '',
        value = NaN,
        convertInput = function (val) {
            return val.toFixed(decimalPlaces);
        },
        convertText = function (val) {
            return isNaN(val) ? '-' : val.toFixed(decimalPlaces).replace(/\./g, ',');
        },
        calculation = function () {
            return null;
        };

    // privileged functions
    this.addDependent = function (newDependent) {
        dependentList.push(newDependent);
    };
    this.addFollower = function (newFollower) {
        followerList.push(newFollower);
    };
    this.calculateValueRecursive = function (changedCalculationNumberList) {
        console.log('calculateValueRecursive(' + changedCalculationNumberList.length + '): ' + identifier);
        // update object class and value via calculation
        value = calculation();
        Calculation.storeValue(identifier, value);
        // update class and value of input- and text-tags
        $identifier.removeClass('value-initial value-input value-calculate value-unknown');
        $identifier.addClass(isNaN(value) ? 'value-unknown' : 'value-calculate');
        $input.val(convertInput(value));
        console.log(value);
        $text.text(convertText(value));
        // add object to changedCalculationNumberList
        changedCalculationNumberList.push(this);
        // run through followers and force calculation
        var i;
        for (i = 0; i < followerList.length; i = i + 1) {
            if ($.inArray(followerList[i], changedCalculationNumberList) === -1) {
                followerList[i].calculateValueRecursive(changedCalculationNumberList);
            }
        }
    };
    this.initialize = function () {
        // set jquery-selectors
        $identifier = $('.' + identifier);
        $input = $identifier.filter('input');
        $text = $identifier.not('input');
        // dependentList durchlaufen und jeweils sich selbst als Follower eintragen
        var i;
        for (i = 0; i < dependentList.length; i = i + 1) {
            dependentList[i].addFollower(this);
        }
        // update object class and value via local storage
        value = parseFloat(Calculation.loadValue(identifier));
        $identifier.removeClass('value-initial value-input value-calculate value-unknown');
        $identifier.addClass('value-initial');
        // update value and step of input- and value of text-tags
        $input.attr({
            'min': min,
            'max': max,
            'step': 1 / Math.pow(10, decimalPlaces),
            'value': convertInput(value)
        });
        $text.text(convertText(value));
    };
    this.setHandler = function () {
        var thisCalculationNumberObject = this;
        $input.on('change', function () {
            // update object class and value via input
            value = parseFloat($(this).val());
            Calculation.storeValue(identifier, value);
            // update value of input- and text-tags
            $identifier.removeClass('value-initial value-input value-calculate value-unknown');
            $identifier.addClass(isNaN(value) ? 'value-unknown' : 'value-input');
            $input.val(convertInput(value));
            $text.text(convertText(value));
            // run through followers and force calculation
            var i;
            for (i = 0; i < followerList.length; i = i + 1) {
                followerList[i].calculateValueRecursive([thisCalculationNumberObject]);
            }
        });
    };

    // privileged properties
    Object.defineProperties(this, {
        'calculation': {
            set: function (newCalculation) {
                calculation = newCalculation;
            }
        },
        'decimalPlaces': {
            set: function (newDecimalPlaces) {
                newDecimalPlaces = parseInt(newDecimalPlaces, 10);
                if (!isNaN(newDecimalPlaces) && newDecimalPlaces >= 0) {
                    decimalPlaces = newDecimalPlaces;
                } else {
                    alert('error setting decimalPlaces: ' + newDecimalPlaces + ' is not allowed');
                }
            }
        },
        'followerList': {
            get: function () {
                return followerList;
            }
        },
        'identifier': {
            get: function () {
                return identifier;
            },
            set: function (newIdentifier) {
                if (newIdentifier.match(/^[a-zA-Z]+[a-z-A-Z0-9\-_]*$/)) {
                    identifier = newIdentifier;
                } else {
                    alert('error setting identifier: ' + newIdentifier + ' is not allowed');
                }
            }
        },
        'min': {
            set: function (newMin) {
                newMin = parseFloat(newMin);
                if (!isNaN(newMin)) {
                    min = newMin;
                } else {
                    alert('error setting min: ' + newMin + ' is not allowed');
                }
            }
        },
        'max': {
            set: function (newMax) {
                newMax = parseFloat(newMax);
                if (!isNaN(newMax)) {
                    max = newMax;
                } else {
                    alert('error setting max: ' + newMax + ' is not allowed');
                }
            }
        },
        'title': {
            get: function () {
                return title;
            },
            set: function (newTitle) {
                title = newTitle;
            }
        },
        'value': {
            get: function () {
                return value;
            }
        }
    });

};


// class
var CalculationPage = function () {

    'use strict';

    // private vars
    var identifier,
        parameterAfter = '',
        parameterBefore = '',
        parameterList = [],
        resultAfter = '',
        resultBefore = '',
        resultList = [],
        title = '';

    // privileged functions
    this.addParameter = function (newParameter) {
        parameterList.push(newParameter);
    };
    this.addResult = function (newResult) {
        resultList.push(newResult);
    };
    this.populate = function () {
        // nav-menu-entry
        $('#panel-menu ul').append('<li><a href="#page-' + identifier + '">' + title + '</a></li>');
        // add page
        var i,
            page = '<div data-role="page" id="page-' + identifier + '">' +
                '<section><h2>' + title + '</h2><section><h3>Parameter</h3><form>' +
                parameterBefore;
        for (i = 0; i < parameterList.length; i = i + 1) {
            page = page +
                '<div class="container container-' + parameterList[i].identifier + '">' +
                '<label for="' + parameterList[i].identifier + '-' + String(CalculationPage.counter) + '"' +
                ' class="ui-btn ui-btn-icon-left ui-icon-edit ui-corner-all">' + parameterList[i].title + '</label>' +
                '<input id="' + parameterList[i].identifier + '-' + String(CalculationPage.counter) + '"' +
                ' class="' + parameterList[i].identifier + '" type="number" data-clear-btn="true"/>' +
                '</div>';
            CalculationPage.counter = CalculationPage.counter + 1;
        }
        page = page + parameterAfter + '</form></section><section><h3>Ergebnis</h3>' + resultBefore + '<dl>';
        for (i = 0; i < resultList.length; i = i + 1) {
            page = page +
                '<dt class="label-' + resultList[i].identifier + '">' + resultList[i].title + '<small class="via-' + resultList[i].identifier + '"></small>:</dt>' +
                '<dd class="' + resultList[i].identifier + '"></dd>';
        }
        page = page + '</dl>' + resultAfter + '</section></section></div>';
        $('body>div').filter(':last').after(page);
    };

    // privileged properties
    Object.defineProperties(this, {
        'identifier': {
            set: function (newIdentifier) {
                identifier = newIdentifier;
            }
        },
        'parameterAfter': {
            set: function (newParameterAfter) {
                parameterAfter = newParameterAfter;
            }
        },
        'parameterBefore': {
            set: function (newParameterBefore) {
                parameterBefore = newParameterBefore;
            }
        },
        'resultAfter': {
            set: function (newResultAfter) {
                resultAfter = newResultAfter;
            }
        },
        'resultBefore': {
            set: function (newResultBefore) {
                resultBefore = newResultBefore;
            }
        },
        'title': {
            set: function (newTitle) {
                title = newTitle;
            }
        }
    });

};
// static var
CalculationPage.counter = 0;