
let coversArr = (form, data, dataSequence, activeIteration) => {
    let a = $("input[name='"+dataSequence[activeIteration]+"']:checked", form).val();
    if(typeof(data[a]) === 'string' || typeof(data[a]) === 'number'){
        return data[a]
    }else {
        activeIteration++;
        return coversArr(form, data[a], dataSequence, activeIteration)
    }
}

$(document).ready(function() {
    $("form.has-calculator").change(function () {
        var form = this;
        var data = $("input[name='data']", form).data().hasdata;
        var dataSequence = $("input[name='data']", form).data().datasequence;
        var sum = 0;
        // var product = $("input[name='product']", form).val();

        let activeIteration = 0;
        sum += coversArr(form, data, dataSequence, activeIteration)
        var out = $('.jPrice', form);
        var outOld = $('.jPriceOld', form);

        var animateFrom = 0 < out.data("animateFrom") ? out.data("animateFrom") : 0;

        $({ animateNumber: animateFrom }).animate({ animateNumber: sum }, {
            duration: 800,
            step: function (animateNumber){
                out.text(Number(animateNumber).toFixed());
                outOld.text(Number(animateNumber * 1.27).toFixed())
            },
            complete: function() {
                out.data("animateFrom", Number(sum).toFixed())
            }
        });
    })
    $("form.has-calculator").change();
})

