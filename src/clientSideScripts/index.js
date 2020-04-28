


$(document).ready(function() {
    $("form.has-calculator").change(function () {
        var form = this;
        var data = $("input[name='data']", form).data().hasdata
        var product = $("input[name='product']", form).val();
        var length = $("input[name='length']:checked", form).val();
        // var data = JSON.parse($("input[name='data']", form))

        console.log(data)

        // sum += data[length];
        // var out = $('.jPrice', form);
        // var outOld = $('.jPriceOld', form);

        // var animateFrom1 = 0 < out.data("animateFrom") ? out.data("animateFrom") : 0;

        // $({ animateNumber: animateFrom1 }).animate({ animateNumber: sum }, {
        //     duration: 800,
        //     step: function (animateNumber){
        //       out.text(Number(animateNumber).toFixed() + " руб.");
        //       outOld.text(Number(animateNumber * 1.5).toFixed() + " руб.")
        //     },
        //     complete: function() {
        //       out.data("animateFrom", Number(sum).toFixed())
        //     }
        //   });

    })
    $("form.has-calculator").change();
})

// let data = {};
// data = document.querySelector('.section_calculator').dataset.hasData;


// console.log(JSON.parse(document.querySelector('.section_calculator').dataset.hasdata))
