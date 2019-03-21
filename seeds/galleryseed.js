exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("gallerytable")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("gallerytable").insert([
        {
          author: "rowValue1",
          link: "https://i.imgur.com/qstVb3L.jpg",
          description: "adnfgniasdjkfnm"
        },
        {
          author: "rowValue2",
          link: "https://i.imgur.com/Sld9dIK.jpg",
          description: "adnfgniasdjkfnm"
        },
        {
          author: "rowValue3",
          link: "https://i.imgur.com/K7r98fo.jpg",
          description: "adnfgniasdjkfnm"
        },

        {
          author: "Justin Bieber",
          link:
            "https://i0.wp.com/wersm.com/wp-content/uploads/2016/11/wersm-instagram-account-week-celebrities-eating-things.png?fit=850%2C500&ssl=1",
          description: "adnfgniasdjkfnm"
        },
        {
          author: "rowValue3",
          link:
            "http://2.bp.blogspot.com/_mmBw3uzPnJI/TDMyxmW6bzI/AAAAAAABaj0/ZYMqPh8y4o0/s400/Celebrities_Caught_Eating_03.jpg",
          description: "adnfgniasdjkfnm"
        },
        {
          author: "rowValue3",
          link:
            "http://4.bp.blogspot.com/_mmBw3uzPnJI/TDMyqRsx4iI/AAAAAAABajk/5M2cmpfZ1Yc/s400/Celebrities_Caught_Eating_05.jpg",
          description: "adnfgniasdjkfnm"
        },
        {
          author: "rowValue3",
          link:
            "http://3.bp.blogspot.com/_mmBw3uzPnJI/TDMyCUl41RI/AAAAAAABahs/58qYcWtB7uU/s400/Celebrities_Caught_Eating_20.jpg",
          description: "adnfgniasdjkfnm"
        },
        {
          author: "rowValue3",
          link:
            "http://3.bp.blogspot.com/_mmBw3uzPnJI/TDMyAsX3pkI/AAAAAAABahM/0KOzKtfVPok/s400/Celebrities_Caught_Eating_24.jpg",
          description: "adnfgniasdjkfnm"
        },
        {
          author: "rowValue3",
          link:
            "http://2.bp.blogspot.com/_mmBw3uzPnJI/TDMx5VjTgbI/AAAAAAABag0/qdZJrQiS-xQ/s400/Celebrities_Caught_Eating_27.jpg",
          description: "adnfgniasdjkfnm"
        },
        {
          author: "rowValue3",
          link:
            "http://1.bp.blogspot.com/_mmBw3uzPnJI/TDMx4xrIzwI/AAAAAAABags/5ZNv1pKDzXw/s400/Celebrities_Caught_Eating_28.jpg",
          description: "adnfgniasdjkfnm"
        },
        {
          author: "rowValue3",
          link:
            "http://1.bp.blogspot.com/_mmBw3uzPnJI/TDMx4qbRSbI/AAAAAAABagk/24Mu3Zeqt_s/s400/Celebrities_Caught_Eating_29.jpg",
          description: "adnfgniasdjkfnm"
        },
        {
          author: "rowValue3",
          link:
            "http://1.bp.blogspot.com/_mmBw3uzPnJI/TDMxxByn-HI/AAAAAAABagc/KfnEhoAd03Q/s400/Celebrities_Caught_Eating_30.jpg",
          description: "adnfgniasdjkfnm"
        },
        {
          author: "rowValue3",
          link:
            "http://2.bp.blogspot.com/_mmBw3uzPnJI/TDMxvEj864I/AAAAAAABaf8/tGcg-HZhW90/s400/Celebrities_Caught_Eating_34.jpg",
          description: "adnfgniasdjkfnm"
        },
        {
          author: "rowValue3",
          link: "https://i.imgur.com/qxA8yBM.jpg",
          description: "adnfgniasdjkfnm"
        },
        {
          author: "rowValue3",
          link: "https://i.imgur.com/RRyHAvt.jpg",
          description: "adnfgniasdjkfnm"
        },
        {
          author: "rowValue3",
          link: "https://i.imgur.com/94aTkp6.jpg",
          description: "adnfgniasdjkfnm"
        },
        {
          author: "rowValue3",
          link: "https://i.imgur.com/C4qh80m.jpg",
          description: "adnfgniasdjkfnm"
        },
        {
          author: "rowValue3",
          link:
            "http://1.bp.blogspot.com/_mmBw3uzPnJI/TDMyXCUf_LI/AAAAAAABah0/Be6B3vZ3hvk/s1600/Celebrities_Caught_Eating_19.jpg",
          description: "adnfgniasdjkfnm"
        },
        {
          author: "rowValue3",
          link:
            "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/articles/2015/08/jimmy-fallon-1470861361.jpg",
          description: "adnfgniasdjkfnm"
        },
        {
          author: "rowValue3",
          link:
            "https://s3.r29static.com//bin/entry/008/x,80/1556207/image.jpg",
          description: "adnfgniasdjkfnm"
        }
      ]);
    });
};
