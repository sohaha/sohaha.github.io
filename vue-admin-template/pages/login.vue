<template>
  <el-container id='login-view' class="h-screen">
    <div class="starry-warpper warpper-bg">
      <div class="stars"></div>
      <div class="stars2"></div>
      <div class="stars3"></div>
    </div>
    <div class='w-full flex justify-center self-center'>
      <div class="w-80 sm:w-auto opacity-80 shadow">
        <div id='login-main' class="flex max-w-md mx-auto overflow-hidden bg-white shadow-lg sm:max-w-4xl">
          <div class="warpper-bg rotate-180 hidden bg-cover sm:block from-primary">
            <img src="https://images.unsplash.com/photo-1534888102055-69b44581d509?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=320&h=316&q=60" class='opacity-60 min-w-full w-80 h-full'>
          </div>
          <div class="px-6 py-8 sm:px-8 w-80">
            <h2 class="text-2xl font-semibold text-center text-gray-700">{{ ProjectName }}</h2>
            <p class="my-4 text-xl text-center text-gray-600">欢迎回来！</p>
            <form-create ref='form' @on-submit="formSubmit" @keyup.enter.native='formSubmit' :rule="formRule" :option="formOption"></form-create>
            <div class="hidden flex items-center justify-between mt-4">
              <span class="w-1/5 border-b md:w-1/4"></span> <a href="#" class="text-xs text-gray-500 uppercase hover:underline">其他登录方式</a> <span class="w-1/5 border-b md:w-1/4"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-container>
</template>

<script>
// 优先载入需要 js
export default load({
  js: [VueRun.lib('/form-create/form-create.js')]
}).then(async () => {
  const { useTip } = util;
  const { useRouter, useCache, useStore, useLoading, } = hook;
  const { watch, ref, onMounted, } = vue;
  const { user: userApi } = api;
  return {
    name: 'login',
    setup (prop, ctx) {
      const {
        loading,
        withLoading
      } = useLoading();
      const {
        getCache
      } = useCache({}, window['sessionStorage']);
      watch(() => [ctx.root.initSate, useStore(ctx).getters.isLogin], ([init, isLogin]) => {
        if (init) {
          if (isLogin) {
            ctx.root.loading = true;
            useRouter(ctx).replace(getCache('last_url', '/main/main'));
          } else {
            ctx.root.loading = false;
          }
        }
      }, {
        immediate: true
      });

      let form = ref(null);
      let formOption = {
        form: {
          hideRequiredAsterisk: false,
          labelPosition: 'top',
        },
        submitBtn: {
          icon: '',
          innerText: '登 录',
        },
      };
      const formSubmit = async (data) => {
        if (typeof data.target === 'object') {
          form.value.$f.submit();
          return;
        }
        try {
          let res = await withLoading(() => userApi.login(data));
          if (res.code === 200) {
            useStore(ctx).commit('setToken', res.data.token);
            await ctx.root.getUserInfo();
            useTip().message('success', '登录成功');
          } else {
            useTip().notify('warning', res.msg, '登录失败');
          }
        } catch (e) {
          useTip().notify('warning', e, '登录失败');
        }
      };
      let formRule = [{
        type: 'input',
        field: 'user',
        value: '',
        title: '',
        props: {
          prefixIcon: 'icon-person',
          placeholder: '用户名...',
          autofocus: true,
          clearable: true
        },
        validate: [{
          required: true,
          message: '请输入用户名',
          trigger: 'change'
        }]
      },
        {
          title: '',
          type: 'input',
          field: 'pass',
          value: '',
          props: {
            prefixIcon: 'icon-lock',
            placeholder: '用户密码...',
            autofocus: true,
            type: 'password',
            showPassword: true,
            clearable: true
          },
          validate: [{
            required: true,
            message: '密码不能小于3位',
            trigger: 'change',
            validator: function (rule, value, callback) {
              if (!value) {
                callback(new Error('请输入密码'));
              } else if (value.length < 1) {
                callback(new Error('密码不能小于3位'));
              } else {
                callback();
              }
            }
          }]
        },
      ];
      onMounted(() => {
        watch(() => loading.value, (n) => {
          form.value.$f.submitBtnProps({
            loading: n
          });
          formRule.forEach(e => {
            e.props.readonly = n;
          });
          form.value.$f.reload();
        });
      });

      let activeName = ref('username');
      watch(() => activeName.value, (val, prev) => {
        console.log('切换登录方式', prev, ' -> ', val);
      });

      return {
        ProjectName: ref(ctx.root.ProjectName),
        activeName,
        formOption,
        formSubmit,
        form,
        formRule,
      };
    },
  };
});
</script>

<style scoped>
.starry-warpper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
}

.starry-warpper .stars {
  width: 1px;
  height: 1px;
  background: transparent;
  -webkit-box-shadow: 1804px 1265px #2485c1, 365px 332px #2485c1,
  86px 1888px #2485c1, 1888px 484px #2485c1, 199px 1489px #2485c1,
  1459px 1010px #2485c1, 807px 388px #2485c1, 855px 558px #2485c1,
  83px 1095px #2485c1, 1418px 377px #2485c1, 677px 886px #2485c1,
  862px 1709px #2485c1, 1058px 1085px #2485c1, 50px 1772px #2485c1,
  1941px 1544px #2485c1, 377px 900px #2485c1, 184px 712px #2485c1,
  1797px 1928px #2485c1, 507px 1861px #2485c1, 1849px 19px #2485c1,
  1399px 200px #2485c1, 972px 497px #2485c1, 795px 1109px #2485c1,
  746px 970px #2485c1, 1524px 972px #2485c1, 1631px 389px #2485c1,
  1026px 1016px #2485c1, 1295px 862px #2485c1, 1258px 1876px #2485c1,
  791px 189px #2485c1, 1519px 45px #2485c1, 592px 1405px #2485c1,
  620px 130px #2485c1, 1044px 1171px #2485c1, 37px 1578px #2485c1,
  1589px 86px #2485c1, 1024px 528px #2485c1, 1613px 568px #2485c1,
  912px 1175px #2485c1, 1177px 133px #2485c1, 67px 1641px #2485c1,
  1168px 357px #2485c1, 310px 1873px #2485c1, 1187px 573px #2485c1,
  308px 1839px #2485c1, 565px 24px #2485c1, 1691px 1555px #2485c1,
  1384px 1551px #2485c1, 179px 861px #2485c1, 1850px 1966px #2485c1,
  1169px 1979px #2485c1, 1182px 1522px #2485c1, 616px 751px #2485c1,
  1083px 908px #2485c1, 684px 766px #2485c1, 67px 955px #2485c1,
  1813px 1714px #2485c1, 1256px 1413px #2485c1, 332px 803px #2485c1,
  1670px 1921px #2485c1, 362px 211px #2485c1, 1513px 423px #2485c1,
  1304px 1145px #2485c1, 1292px 1168px #2485c1, 611px 802px #2485c1,
  1297px 575px #2485c1, 540px 1289px #2485c1, 1551px 1678px #2485c1,
  1545px 237px #2485c1, 423px 138px #2485c1, 1088px 28px #2485c1,
  642px 1637px #2485c1, 429px 1293px #2485c1, 1276px 1900px #2485c1,
  1168px 1696px #2485c1, 847px 837px #2485c1, 151px 1395px #2485c1,
  1490px 75px #2485c1, 1588px 131px #2485c1, 1739px 1358px #2485c1,
  709px 624px #2485c1, 343px 502px #2485c1, 1342px 1690px #2485c1,
  175px 1722px #2485c1, 964px 1299px #2485c1, 892px 1326px #2485c1,
  519px 1142px #2485c1, 1014px 193px #2485c1, 1181px 360px #2485c1,
  325px 139px #2485c1, 482px 1199px #2485c1, 613px 8px #2485c1,
  1976px 1125px #2485c1, 346px 60px #2485c1, 1565px 818px #2485c1,
  268px 1590px #2485c1, 213px 1666px #2485c1, 800px 464px #2485c1,
  974px 1825px #2485c1, 1066px 23px #2485c1, 1995px 1499px #2485c1,
  666px 1130px #2485c1, 1074px 1710px #2485c1, 1636px 1483px #2485c1,
  1379px 1509px #2485c1, 1221px 887px #2485c1, 1857px 964px #2485c1,
  1046px 993px #2485c1, 1875px 643px #2485c1, 1504px 1607px #2485c1,
  1065px 641px #2485c1, 1095px 752px #2485c1, 566px 1737px #2485c1,
  1972px 1778px #2485c1, 146px 1517px #2485c1, 1923px 588px #2485c1,
  557px 881px #2485c1, 1885px 1950px #2485c1, 1739px 1598px #2485c1,
  1048px 501px #2485c1, 1316px 705px #2485c1, 1900px 1697px #2485c1,
  1187px 917px #2485c1, 1688px 1025px #2485c1, 648px 1634px #2485c1,
  1002px 572px #2485c1, 603px 1995px #2485c1, 215px 693px #2485c1,
  688px 1374px #2485c1, 1389px 1166px #2485c1, 1310px 1140px #2485c1,
  245px 587px #2485c1, 845px 63px #2485c1, 296px 1646px #2485c1,
  792px 350px #2485c1, 756px 1493px #2485c1, 1553px 1079px #2485c1,
  850px 66px #2485c1, 963px 1904px #2485c1, 81px 207px #2485c1,
  1776px 1634px #2485c1, 1759px 521px #2485c1, 1761px 1536px #2485c1,
  601px 1485px #2485c1, 898px 153px #2485c1, 48px 648px #2485c1,
  1644px 1109px #2485c1, 1974px 60px #2485c1, 1278px 653px #2485c1,
  616px 432px #2485c1, 1179px 1849px #2485c1, 739px 677px #2485c1,
  808px 1850px #2485c1, 1104px 827px #2485c1, 984px 888px #2485c1,
  1027px 44px #2485c1, 1462px 1105px #2485c1, 902px 1486px #2485c1,
  769px 441px #2485c1, 431px 1195px #2485c1, 4px 764px #2485c1,
  562px 7px #2485c1, 952px 1744px #2485c1, 822px 971px #2485c1,
  1016px 1804px #2485c1, 1429px 1161px #2485c1, 328px 1568px #2485c1,
  101px 746px #2485c1, 649px 1484px #2485c1, 1903px 569px #2485c1,
  733px 871px #2485c1, 1554px 505px #2485c1, 1076px 642px #2485c1,
  609px 641px #2485c1, 996px 149px #2485c1, 1595px 758px #2485c1,
  14px 1083px #2485c1, 261px 767px #2485c1, 1274px 1517px #2485c1,
  1412px 215px #2485c1, 1651px 879px #2485c1, 284px 1633px #2485c1,
  1439px 287px #2485c1, 1717px 270px #2485c1, 1107px 1063px #2485c1,
  1521px 1831px #2485c1, 656px 1702px #2485c1, 25px 230px #2485c1,
  1958px 1615px #2485c1, 646px 675px #2485c1, 1201px 343px #2485c1,
  1918px 1064px #2485c1, 1932px 609px #2485c1, 1203px 900px #2485c1,
  10px 575px #2485c1, 1582px 1828px #2485c1, 1184px 462px #2485c1,
  1px 1619px #2485c1, 1440px 1071px #2485c1, 1844px 1913px #2485c1,
  376px 1054px #2485c1, 1883px 1236px #2485c1, 571px 493px #2485c1,
  354px 1701px #2485c1, 747px 60px #2485c1, 11px 1142px #2485c1,
  1136px 1891px #2485c1, 1682px 473px #2485c1, 1537px 1520px #2485c1,
  902px 836px #2485c1, 1313px 395px #2485c1, 534px 341px #2485c1,
  230px 1614px #2485c1, 14px 1387px #2485c1, 1296px 1765px #2485c1,
  1064px 1270px #2485c1, 761px 975px #2485c1, 1855px 335px #2485c1,
  198px 110px #2485c1, 1660px 598px #2485c1, 1022px 933px #2485c1,
  518px 356px #2485c1, 19px 865px #2485c1, 471px 830px #2485c1,
  758px 358px #2485c1, 541px 1652px #2485c1, 320px 926px #2485c1,
  425px 1826px #2485c1, 659px 353px #2485c1, 708px 778px #2485c1,
  862px 641px #2485c1, 475px 1362px #2485c1, 1326px 1449px #2485c1,
  446px 802px #2485c1, 391px 1169px #2485c1, 496px 39px #2485c1,
  1534px 934px #2485c1, 1822px 1809px #2485c1, 1454px 237px #2485c1,
  187px 1555px #2485c1, 1069px 1977px #2485c1, 1880px 1508px #2485c1,
  279px 418px #2485c1, 1938px 1980px #2485c1, 1304px 530px #2485c1,
  1763px 187px #2485c1, 1945px 1642px #2485c1, 311px 1490px #2485c1,
  770px 1598px #2485c1, 263px 330px #2485c1, 1733px 1771px #2485c1,
  978px 34px #2485c1, 325px 1776px #2485c1, 873px 1460px #2485c1,
  365px 33px #2485c1, 913px 1999px #2485c1, 667px 1021px #2485c1,
  27px 572px #2485c1, 950px 1858px #2485c1, 448px 1205px #2485c1,
  1302px 1138px #2485c1, 1269px 932px #2485c1, 480px 132px #2485c1,
  770px 1871px #2485c1, 952px 654px #2485c1, 623px 90px #2485c1,
  419px 1683px #2485c1, 930px 794px #2485c1, 1327px 1651px #2485c1,
  769px 1536px #2485c1, 895px 90px #2485c1, 599px 1268px #2485c1,
  1645px 919px #2485c1, 1672px 1080px #2485c1, 1637px 1259px #2485c1,
  243px 1182px #2485c1, 1509px 457px #2485c1, 1374px 1469px #2485c1,
  751px 137px #2485c1, 1097px 1008px #2485c1, 1979px 1381px #2485c1,
  981px 1825px #2485c1, 928px 1930px #2485c1, 632px 422px #2485c1,
  812px 341px #2485c1, 1077px 1832px #2485c1, 203px 1452px #2485c1,
  664px 1531px #2485c1, 1203px 57px #2485c1, 1654px 1203px #2485c1,
  491px 174px #2485c1, 1507px 735px #2485c1, 964px 896px #2485c1,
  52px 1718px #2485c1, 1435px 26px #2485c1, 753px 635px #2485c1,
  890px 1847px #2485c1, 42px 1353px #2485c1, 717px 72px #2485c1,
  1845px 1212px #2485c1, 344px 867px #2485c1, 418px 855px #2485c1,
  899px 1124px #2485c1, 1798px 1582px #2485c1;
  box-shadow: 1804px 1265px #2485c1, 365px 332px #2485c1, 86px 1888px #2485c1,
  1888px 484px #2485c1, 199px 1489px #2485c1, 1459px 1010px #2485c1,
  807px 388px #2485c1, 855px 558px #2485c1, 83px 1095px #2485c1,
  1418px 377px #2485c1, 677px 886px #2485c1, 862px 1709px #2485c1,
  1058px 1085px #2485c1, 50px 1772px #2485c1, 1941px 1544px #2485c1,
  377px 900px #2485c1, 184px 712px #2485c1, 1797px 1928px #2485c1,
  507px 1861px #2485c1, 1849px 19px #2485c1, 1399px 200px #2485c1,
  972px 497px #2485c1, 795px 1109px #2485c1, 746px 970px #2485c1,
  1524px 972px #2485c1, 1631px 389px #2485c1, 1026px 1016px #2485c1,
  1295px 862px #2485c1, 1258px 1876px #2485c1, 791px 189px #2485c1,
  1519px 45px #2485c1, 592px 1405px #2485c1, 620px 130px #2485c1,
  1044px 1171px #2485c1, 37px 1578px #2485c1, 1589px 86px #2485c1,
  1024px 528px #2485c1, 1613px 568px #2485c1, 912px 1175px #2485c1,
  1177px 133px #2485c1, 67px 1641px #2485c1, 1168px 357px #2485c1,
  310px 1873px #2485c1, 1187px 573px #2485c1, 308px 1839px #2485c1,
  565px 24px #2485c1, 1691px 1555px #2485c1, 1384px 1551px #2485c1,
  179px 861px #2485c1, 1850px 1966px #2485c1, 1169px 1979px #2485c1,
  1182px 1522px #2485c1, 616px 751px #2485c1, 1083px 908px #2485c1,
  684px 766px #2485c1, 67px 955px #2485c1, 1813px 1714px #2485c1,
  1256px 1413px #2485c1, 332px 803px #2485c1, 1670px 1921px #2485c1,
  362px 211px #2485c1, 1513px 423px #2485c1, 1304px 1145px #2485c1,
  1292px 1168px #2485c1, 611px 802px #2485c1, 1297px 575px #2485c1,
  540px 1289px #2485c1, 1551px 1678px #2485c1, 1545px 237px #2485c1,
  423px 138px #2485c1, 1088px 28px #2485c1, 642px 1637px #2485c1,
  429px 1293px #2485c1, 1276px 1900px #2485c1, 1168px 1696px #2485c1,
  847px 837px #2485c1, 151px 1395px #2485c1, 1490px 75px #2485c1,
  1588px 131px #2485c1, 1739px 1358px #2485c1, 709px 624px #2485c1,
  343px 502px #2485c1, 1342px 1690px #2485c1, 175px 1722px #2485c1,
  964px 1299px #2485c1, 892px 1326px #2485c1, 519px 1142px #2485c1,
  1014px 193px #2485c1, 1181px 360px #2485c1, 325px 139px #2485c1,
  482px 1199px #2485c1, 613px 8px #2485c1, 1976px 1125px #2485c1,
  346px 60px #2485c1, 1565px 818px #2485c1, 268px 1590px #2485c1,
  213px 1666px #2485c1, 800px 464px #2485c1, 974px 1825px #2485c1,
  1066px 23px #2485c1, 1995px 1499px #2485c1, 666px 1130px #2485c1,
  1074px 1710px #2485c1, 1636px 1483px #2485c1, 1379px 1509px #2485c1,
  1221px 887px #2485c1, 1857px 964px #2485c1, 1046px 993px #2485c1,
  1875px 643px #2485c1, 1504px 1607px #2485c1, 1065px 641px #2485c1,
  1095px 752px #2485c1, 566px 1737px #2485c1, 1972px 1778px #2485c1,
  146px 1517px #2485c1, 1923px 588px #2485c1, 557px 881px #2485c1,
  1885px 1950px #2485c1, 1739px 1598px #2485c1, 1048px 501px #2485c1,
  1316px 705px #2485c1, 1900px 1697px #2485c1, 1187px 917px #2485c1,
  1688px 1025px #2485c1, 648px 1634px #2485c1, 1002px 572px #2485c1,
  603px 1995px #2485c1, 215px 693px #2485c1, 688px 1374px #2485c1,
  1389px 1166px #2485c1, 1310px 1140px #2485c1, 245px 587px #2485c1,
  845px 63px #2485c1, 296px 1646px #2485c1, 792px 350px #2485c1,
  756px 1493px #2485c1, 1553px 1079px #2485c1, 850px 66px #2485c1,
  963px 1904px #2485c1, 81px 207px #2485c1, 1776px 1634px #2485c1,
  1759px 521px #2485c1, 1761px 1536px #2485c1, 601px 1485px #2485c1,
  898px 153px #2485c1, 48px 648px #2485c1, 1644px 1109px #2485c1,
  1974px 60px #2485c1, 1278px 653px #2485c1, 616px 432px #2485c1,
  1179px 1849px #2485c1, 739px 677px #2485c1, 808px 1850px #2485c1,
  1104px 827px #2485c1, 984px 888px #2485c1, 1027px 44px #2485c1,
  1462px 1105px #2485c1, 902px 1486px #2485c1, 769px 441px #2485c1,
  431px 1195px #2485c1, 4px 764px #2485c1, 562px 7px #2485c1,
  952px 1744px #2485c1, 822px 971px #2485c1, 1016px 1804px #2485c1,
  1429px 1161px #2485c1, 328px 1568px #2485c1, 101px 746px #2485c1,
  649px 1484px #2485c1, 1903px 569px #2485c1, 733px 871px #2485c1,
  1554px 505px #2485c1, 1076px 642px #2485c1, 609px 641px #2485c1,
  996px 149px #2485c1, 1595px 758px #2485c1, 14px 1083px #2485c1,
  261px 767px #2485c1, 1274px 1517px #2485c1, 1412px 215px #2485c1,
  1651px 879px #2485c1, 284px 1633px #2485c1, 1439px 287px #2485c1,
  1717px 270px #2485c1, 1107px 1063px #2485c1, 1521px 1831px #2485c1,
  656px 1702px #2485c1, 25px 230px #2485c1, 1958px 1615px #2485c1,
  646px 675px #2485c1, 1201px 343px #2485c1, 1918px 1064px #2485c1,
  1932px 609px #2485c1, 1203px 900px #2485c1, 10px 575px #2485c1,
  1582px 1828px #2485c1, 1184px 462px #2485c1, 1px 1619px #2485c1,
  1440px 1071px #2485c1, 1844px 1913px #2485c1, 376px 1054px #2485c1,
  1883px 1236px #2485c1, 571px 493px #2485c1, 354px 1701px #2485c1,
  747px 60px #2485c1, 11px 1142px #2485c1, 1136px 1891px #2485c1,
  1682px 473px #2485c1, 1537px 1520px #2485c1, 902px 836px #2485c1,
  1313px 395px #2485c1, 534px 341px #2485c1, 230px 1614px #2485c1,
  14px 1387px #2485c1, 1296px 1765px #2485c1, 1064px 1270px #2485c1,
  761px 975px #2485c1, 1855px 335px #2485c1, 198px 110px #2485c1,
  1660px 598px #2485c1, 1022px 933px #2485c1, 518px 356px #2485c1,
  19px 865px #2485c1, 471px 830px #2485c1, 758px 358px #2485c1,
  541px 1652px #2485c1, 320px 926px #2485c1, 425px 1826px #2485c1,
  659px 353px #2485c1, 708px 778px #2485c1, 862px 641px #2485c1,
  475px 1362px #2485c1, 1326px 1449px #2485c1, 446px 802px #2485c1,
  391px 1169px #2485c1, 496px 39px #2485c1, 1534px 934px #2485c1,
  1822px 1809px #2485c1, 1454px 237px #2485c1, 187px 1555px #2485c1,
  1069px 1977px #2485c1, 1880px 1508px #2485c1, 279px 418px #2485c1,
  1938px 1980px #2485c1, 1304px 530px #2485c1, 1763px 187px #2485c1,
  1945px 1642px #2485c1, 311px 1490px #2485c1, 770px 1598px #2485c1,
  263px 330px #2485c1, 1733px 1771px #2485c1, 978px 34px #2485c1,
  325px 1776px #2485c1, 873px 1460px #2485c1, 365px 33px #2485c1,
  913px 1999px #2485c1, 667px 1021px #2485c1, 27px 572px #2485c1,
  950px 1858px #2485c1, 448px 1205px #2485c1, 1302px 1138px #2485c1,
  1269px 932px #2485c1, 480px 132px #2485c1, 770px 1871px #2485c1,
  952px 654px #2485c1, 623px 90px #2485c1, 419px 1683px #2485c1,
  930px 794px #2485c1, 1327px 1651px #2485c1, 769px 1536px #2485c1,
  895px 90px #2485c1, 599px 1268px #2485c1, 1645px 919px #2485c1,
  1672px 1080px #2485c1, 1637px 1259px #2485c1, 243px 1182px #2485c1,
  1509px 457px #2485c1, 1374px 1469px #2485c1, 751px 137px #2485c1,
  1097px 1008px #2485c1, 1979px 1381px #2485c1, 981px 1825px #2485c1,
  928px 1930px #2485c1, 632px 422px #2485c1, 812px 341px #2485c1,
  1077px 1832px #2485c1, 203px 1452px #2485c1, 664px 1531px #2485c1,
  1203px 57px #2485c1, 1654px 1203px #2485c1, 491px 174px #2485c1,
  1507px 735px #2485c1, 964px 896px #2485c1, 52px 1718px #2485c1,
  1435px 26px #2485c1, 753px 635px #2485c1, 890px 1847px #2485c1,
  42px 1353px #2485c1, 717px 72px #2485c1, 1845px 1212px #2485c1,
  344px 867px #2485c1, 418px 855px #2485c1, 899px 1124px #2485c1,
  1798px 1582px #2485c1;
  -webkit-animation: y 120s linear infinite;
  animation: y 120s linear infinite;
}

.starry-warpper .stars:after {
  content: ' ';
  position: absolute;
  top: 2000px;
  width: 1px;
  height: 1px;
  background: transparent;
  -webkit-box-shadow: 1804px 1265px #2485c1, 365px 332px #2485c1,
  86px 1888px #2485c1, 1888px 484px #2485c1, 199px 1489px #2485c1,
  1459px 1010px #2485c1, 807px 388px #2485c1, 855px 558px #2485c1,
  83px 1095px #2485c1, 1418px 377px #2485c1, 677px 886px #2485c1,
  862px 1709px #2485c1, 1058px 1085px #2485c1, 50px 1772px #2485c1,
  1941px 1544px #2485c1, 377px 900px #2485c1, 184px 712px #2485c1,
  1797px 1928px #2485c1, 507px 1861px #2485c1, 1849px 19px #2485c1,
  1399px 200px #2485c1, 972px 497px #2485c1, 795px 1109px #2485c1,
  746px 970px #2485c1, 1524px 972px #2485c1, 1631px 389px #2485c1,
  1026px 1016px #2485c1, 1295px 862px #2485c1, 1258px 1876px #2485c1,
  791px 189px #2485c1, 1519px 45px #2485c1, 592px 1405px #2485c1,
  620px 130px #2485c1, 1044px 1171px #2485c1, 37px 1578px #2485c1,
  1589px 86px #2485c1, 1024px 528px #2485c1, 1613px 568px #2485c1,
  912px 1175px #2485c1, 1177px 133px #2485c1, 67px 1641px #2485c1,
  1168px 357px #2485c1, 310px 1873px #2485c1, 1187px 573px #2485c1,
  308px 1839px #2485c1, 565px 24px #2485c1, 1691px 1555px #2485c1,
  1384px 1551px #2485c1, 179px 861px #2485c1, 1850px 1966px #2485c1,
  1169px 1979px #2485c1, 1182px 1522px #2485c1, 616px 751px #2485c1,
  1083px 908px #2485c1, 684px 766px #2485c1, 67px 955px #2485c1,
  1813px 1714px #2485c1, 1256px 1413px #2485c1, 332px 803px #2485c1,
  1670px 1921px #2485c1, 362px 211px #2485c1, 1513px 423px #2485c1,
  1304px 1145px #2485c1, 1292px 1168px #2485c1, 611px 802px #2485c1,
  1297px 575px #2485c1, 540px 1289px #2485c1, 1551px 1678px #2485c1,
  1545px 237px #2485c1, 423px 138px #2485c1, 1088px 28px #2485c1,
  642px 1637px #2485c1, 429px 1293px #2485c1, 1276px 1900px #2485c1,
  1168px 1696px #2485c1, 847px 837px #2485c1, 151px 1395px #2485c1,
  1490px 75px #2485c1, 1588px 131px #2485c1, 1739px 1358px #2485c1,
  709px 624px #2485c1, 343px 502px #2485c1, 1342px 1690px #2485c1,
  175px 1722px #2485c1, 964px 1299px #2485c1, 892px 1326px #2485c1,
  519px 1142px #2485c1, 1014px 193px #2485c1, 1181px 360px #2485c1,
  325px 139px #2485c1, 482px 1199px #2485c1, 613px 8px #2485c1,
  1976px 1125px #2485c1, 346px 60px #2485c1;
  box-shadow: 1804px 1265px #2485c1, 365px 332px #2485c1, 86px 1888px #2485c1,
  1888px 484px #2485c1, 199px 1489px #2485c1, 1459px 1010px #2485c1,
  807px 388px #2485c1, 855px 558px #2485c1, 83px 1095px #2485c1,
  1418px 377px #2485c1, 677px 886px #2485c1, 862px 1709px #2485c1,
  1058px 1085px #2485c1, 50px 1772px #2485c1, 1941px 1544px #2485c1,
  377px 900px #2485c1, 184px 712px #2485c1, 1797px 1928px #2485c1,
  507px 1861px #2485c1, 1849px 19px #2485c1, 1399px 200px #2485c1,
  972px 497px #2485c1, 795px 1109px #2485c1, 746px 970px #2485c1,
  1524px 972px #2485c1, 1631px 389px #2485c1, 1026px 1016px #2485c1,
  1295px 862px #2485c1, 1258px 1876px #2485c1, 791px 189px #2485c1,
  1519px 45px #2485c1, 592px 1405px #2485c1, 620px 130px #2485c1,
  1044px 1171px #2485c1, 37px 1578px #2485c1, 1589px 86px #2485c1,
  1024px 528px #2485c1, 1613px 568px #2485c1, 912px 1175px #2485c1,
  1177px 133px #2485c1, 67px 1641px #2485c1, 1168px 357px #2485c1,
  310px 1873px #2485c1, 1187px 573px #2485c1, 308px 1839px #2485c1,
  565px 24px #2485c1, 1691px 1555px #2485c1, 1384px 1551px #2485c1,
  179px 861px #2485c1, 1850px 1966px #2485c1, 1169px 1979px #2485c1,
  1182px 1522px #2485c1, 616px 751px #2485c1, 1083px 908px #2485c1,
  684px 766px #2485c1, 67px 955px #2485c1, 1813px 1714px #2485c1,
  1256px 1413px #2485c1, 332px 803px #2485c1, 1670px 1921px #2485c1,
  362px 211px #2485c1, 1513px 423px #2485c1, 1304px 1145px #2485c1,
  1292px 1168px #2485c1, 611px 802px #2485c1, 1297px 575px #2485c1,
  540px 1289px #2485c1, 1551px 1678px #2485c1, 1545px 237px #2485c1,
  423px 138px #2485c1, 1088px 28px #2485c1, 642px 1637px #2485c1,
  429px 1293px #2485c1, 1276px 1900px #2485c1, 1168px 1696px #2485c1,
  847px 837px #2485c1, 151px 1395px #2485c1, 1490px 75px #2485c1,
  1588px 131px #2485c1, 1739px 1358px #2485c1, 709px 624px #2485c1,
  343px 502px #2485c1, 1342px 1690px #2485c1, 175px 1722px #2485c1,
  964px 1299px #2485c1, 892px 1326px #2485c1, 519px 1142px #2485c1,
  1014px 193px #2485c1, 1181px 360px #2485c1, 325px 139px #2485c1,
  482px 1199px #2485c1, 613px 8px #2485c1, 1976px 1125px #2485c1,
  346px 60px #2485c1;
}

.starry-warpper .stars2 {
  width: 2px;
  height: 2px;
  background: transparent;
  -webkit-box-shadow: 114px 658px #2485c1, 236px 768px #2485c1,
  1130px 1503px #2485c1, 486px 592px #2485c1, 1353px 1407px #2485c1,
  1583px 1741px #2485c1, 450px 1479px #2485c1, 1845px 327px #2485c1,
  1520px 361px #2485c1, 580px 1699px #2485c1, 1277px 1233px #2485c1,
  1697px 943px #2485c1, 568px 1135px #2485c1, 1273px 263px #2485c1,
  788px 126px #2485c1, 1834px 1911px #2485c1, 1147px 1652px #2485c1,
  651px 567px #2485c1, 79px 1897px #2485c1, 1590px 666px #2485c1,
  1362px 566px #2485c1, 275px 367px #2485c1, 556px 479px #2485c1,
  1063px 476px #2485c1, 1337px 1119px #2485c1, 1780px 1109px #2485c1,
  1323px 1655px #2485c1, 1740px 1165px #2485c1, 525px 60px #2485c1,
  1513px 1484px #2485c1, 708px 280px #2485c1, 429px 475px #2485c1,
  563px 1360px #2485c1, 1580px 697px #2485c1, 1702px 1164px #2485c1,
  1649px 1952px #2485c1, 1580px 1812px #2485c1, 70px 1190px #2485c1,
  1100px 98px #2485c1, 1232px 1896px #2485c1, 851px 1047px #2485c1,
  851px 30px #2485c1, 596px 1486px #2485c1, 666px 526px #2485c1,
  1855px 1342px #2485c1, 80px 531px #2485c1, 248px 1804px #2485c1,
  1990px 263px #2485c1, 1796px 1640px #2485c1, 1502px 862px #2485c1,
  1780px 488px #2485c1, 1881px 1191px #2485c1, 1063px 876px #2485c1,
  1614px 1073px #2485c1, 1414px 666px #2485c1, 1865px 289px #2485c1,
  687px 352px #2485c1, 1329px 1312px #2485c1, 279px 136px #2485c1,
  475px 756px #2485c1, 1177px 435px #2485c1, 1264px 921px #2485c1,
  467px 1496px #2485c1, 391px 1359px #2485c1, 666px 1083px #2485c1,
  1526px 1251px #2485c1, 594px 564px #2485c1, 991px 525px #2485c1,
  1511px 875px #2485c1, 1935px 1049px #2485c1, 1471px 1430px #2485c1,
  959px 604px #2485c1, 1685px 72px #2485c1, 1505px 1876px #2485c1,
  509px 1627px #2485c1, 1065px 978px #2485c1, 1860px 884px #2485c1,
  1038px 464px #2485c1, 1051px 106px #2485c1, 1056px 728px #2485c1,
  1953px 45px #2485c1, 1483px 638px #2485c1, 559px 845px #2485c1,
  1184px 922px #2485c1, 1320px 1117px #2485c1, 1572px 747px #2485c1,
  1971px 43px #2485c1, 665px 13px #2485c1, 1457px 1153px #2485c1,
  848px 154px #2485c1, 1039px 1837px #2485c1, 878px 795px #2485c1,
  1286px 1705px #2485c1, 1946px 1143px #2485c1, 1114px 1166px #2485c1,
  1747px 874px #2485c1, 1894px 636px #2485c1, 1316px 541px #2485c1,
  1953px 1620px #2485c1, 1446px 1773px #2485c1, 974px 833px #2485c1,
  1814px 1211px #2485c1, 102px 335px #2485c1, 327px 1868px #2485c1,
  348px 548px #2485c1, 353px 1540px #2485c1, 1212px 1872px #2485c1,
  1968px 129px #2485c1;
  box-shadow: 114px 658px #2485c1, 236px 768px #2485c1, 1130px 1503px #2485c1,
  486px 592px #2485c1, 1353px 1407px #2485c1, 1583px 1741px #2485c1,
  450px 1479px #2485c1, 1845px 327px #2485c1, 1520px 361px #2485c1,
  580px 1699px #2485c1, 1277px 1233px #2485c1, 1697px 943px #2485c1,
  568px 1135px #2485c1, 1273px 263px #2485c1, 788px 126px #2485c1,
  1834px 1911px #2485c1, 1147px 1652px #2485c1, 651px 567px #2485c1,
  79px 1897px #2485c1, 1590px 666px #2485c1, 1362px 566px #2485c1,
  275px 367px #2485c1, 556px 479px #2485c1, 1063px 476px #2485c1,
  1337px 1119px #2485c1, 1780px 1109px #2485c1, 1323px 1655px #2485c1,
  1740px 1165px #2485c1, 525px 60px #2485c1, 1513px 1484px #2485c1,
  708px 280px #2485c1, 429px 475px #2485c1, 563px 1360px #2485c1,
  1580px 697px #2485c1, 1702px 1164px #2485c1, 1649px 1952px #2485c1,
  1580px 1812px #2485c1, 70px 1190px #2485c1, 1100px 98px #2485c1,
  1232px 1896px #2485c1, 851px 1047px #2485c1, 851px 30px #2485c1,
  596px 1486px #2485c1, 666px 526px #2485c1, 1855px 1342px #2485c1,
  80px 531px #2485c1, 248px 1804px #2485c1, 1990px 263px #2485c1,
  1796px 1640px #2485c1, 1502px 862px #2485c1, 1780px 488px #2485c1,
  1881px 1191px #2485c1, 1063px 876px #2485c1, 1614px 1073px #2485c1,
  1414px 666px #2485c1, 1865px 289px #2485c1, 687px 352px #2485c1,
  1329px 1312px #2485c1, 279px 136px #2485c1, 475px 756px #2485c1,
  1177px 435px #2485c1, 1264px 921px #2485c1, 467px 1496px #2485c1,
  391px 1359px #2485c1, 666px 1083px #2485c1, 1526px 1251px #2485c1,
  594px 564px #2485c1, 991px 525px #2485c1, 1511px 875px #2485c1,
  1935px 1049px #2485c1, 1471px 1430px #2485c1, 959px 604px #2485c1,
  1685px 72px #2485c1, 1505px 1876px #2485c1, 509px 1627px #2485c1,
  1065px 978px #2485c1, 1860px 884px #2485c1, 1038px 464px #2485c1,
  1051px 106px #2485c1, 1056px 728px #2485c1, 1953px 45px #2485c1,
  1483px 638px #2485c1, 559px 845px #2485c1, 1184px 922px #2485c1,
  1320px 1117px #2485c1, 1572px 747px #2485c1, 1971px 43px #2485c1,
  665px 13px #2485c1, 1457px 1153px #2485c1, 848px 154px #2485c1,
  1039px 1837px #2485c1, 878px 795px #2485c1, 1286px 1705px #2485c1,
  1946px 1143px #2485c1, 1114px 1166px #2485c1, 1747px 874px #2485c1,
  1894px 636px #2485c1, 1316px 541px #2485c1, 1953px 1620px #2485c1,
  1446px 1773px #2485c1, 974px 833px #2485c1, 1814px 1211px #2485c1,
  102px 335px #2485c1, 327px 1868px #2485c1, 348px 548px #2485c1,
  353px 1540px #2485c1, 1212px 1872px #2485c1, 1968px 129px #2485c1;
}

.starry-warpper .stars2:after {
  content: ' ';
  position: absolute;
  top: 2000px;
  width: 2px;
  height: 2px;
  background: transparent;
  -webkit-box-shadow: 114px 658px #2485c1, 236px 768px #2485c1,
  1130px 1503px #2485c1, 486px 592px #2485c1, 1353px 1407px #2485c1,
  1583px 1741px #2485c1, 450px 1479px #2485c1, 1845px 327px #2485c1,
  1520px 361px #2485c1, 580px 1699px #2485c1, 1277px 1233px #2485c1,
  1697px 943px #2485c1, 568px 1135px #2485c1, 1273px 263px #2485c1,
  788px 126px #2485c1, 1834px 1911px #2485c1, 1147px 1652px #2485c1,
  651px 567px #2485c1, 79px 1897px #2485c1, 1590px 666px #2485c1,
  1362px 566px #2485c1, 275px 367px #2485c1, 556px 479px #2485c1,
  1063px 476px #2485c1, 1337px 1119px #2485c1, 1780px 1109px #2485c1,
  1323px 1655px #2485c1, 1740px 1165px #2485c1, 525px 60px #2485c1,
  1513px 1484px #2485c1, 708px 280px #2485c1, 429px 475px #2485c1,
  563px 1360px #2485c1, 1580px 697px #2485c1, 1702px 1164px #2485c1,
  1649px 1952px #2485c1, 1580px 1812px #2485c1, 70px 1190px #2485c1,
  1100px 98px #2485c1, 1232px 1896px #2485c1, 851px 1047px #2485c1,
  851px 30px #2485c1, 596px 1486px #2485c1, 666px 526px #2485c1,
  1855px 1342px #2485c1, 80px 531px #2485c1, 248px 1804px #2485c1,
  1990px 263px #2485c1, 1796px 1640px #2485c1, 1502px 862px #2485c1,
  1780px 488px #2485c1, 1881px 1191px #2485c1, 1063px 876px #2485c1,
  1614px 1073px #2485c1, 1414px 666px #2485c1, 1865px 289px #2485c1,
  687px 352px #2485c1, 1329px 1312px #2485c1, 279px 136px #2485c1,
  475px 756px #2485c1, 1177px 435px #2485c1, 1264px 921px #2485c1,
  467px 1496px #2485c1, 391px 1359px #2485c1, 666px 1083px #2485c1,
  1526px 1251px #2485c1, 594px 564px #2485c1, 991px 525px #2485c1,
  1511px 875px #2485c1, 1935px 1049px #2485c1, 1471px 1430px #2485c1,
  959px 604px #2485c1, 1685px 72px #2485c1, 1505px 1876px #2485c1,
  509px 1627px #2485c1, 1065px 978px #2485c1, 1860px 884px #2485c1,
  1038px 464px #2485c1, 1051px 106px #2485c1, 1056px 728px #2485c1,
  1953px 45px #2485c1, 1483px 638px #2485c1, 559px 845px #2485c1,
  1184px 922px #2485c1, 1320px 1117px #2485c1, 1572px 747px #2485c1,
  1971px 43px #2485c1, 665px 13px #2485c1, 1457px 1153px #2485c1,
  848px 154px #2485c1, 1039px 1837px #2485c1, 878px 795px #2485c1,
  1286px 1705px #2485c1, 1946px 1143px #2485c1, 1114px 1166px #2485c1,
  1747px 874px #2485c1, 1894px 636px #2485c1, 1316px 541px #2485c1,
  1953px 1620px #2485c1, 1446px 1773px #2485c1, 974px 833px #2485c1;
  box-shadow: 114px 658px #2485c1, 236px 768px #2485c1, 1130px 1503px #2485c1,
  486px 592px #2485c1, 1353px 1407px #2485c1, 1583px 1741px #2485c1,
  450px 1479px #2485c1, 1845px 327px #2485c1, 1520px 361px #2485c1,
  580px 1699px #2485c1, 1277px 1233px #2485c1, 1697px 943px #2485c1,
  568px 1135px #2485c1, 1273px 263px #2485c1, 788px 126px #2485c1,
  1834px 1911px #2485c1, 1147px 1652px #2485c1, 651px 567px #2485c1,
  79px 1897px #2485c1, 1590px 666px #2485c1, 1362px 566px #2485c1,
  275px 367px #2485c1, 556px 479px #2485c1, 1063px 476px #2485c1,
  1337px 1119px #2485c1, 1780px 1109px #2485c1, 1323px 1655px #2485c1,
  1740px 1165px #2485c1, 525px 60px #2485c1, 1513px 1484px #2485c1,
  708px 280px #2485c1, 429px 475px #2485c1, 563px 1360px #2485c1,
  1580px 697px #2485c1, 1702px 1164px #2485c1, 1649px 1952px #2485c1,
  1580px 1812px #2485c1, 70px 1190px #2485c1, 1100px 98px #2485c1,
  1232px 1896px #2485c1, 851px 1047px #2485c1, 851px 30px #2485c1,
  596px 1486px #2485c1, 666px 526px #2485c1, 1855px 1342px #2485c1,
  80px 531px #2485c1, 248px 1804px #2485c1, 1990px 263px #2485c1,
  1796px 1640px #2485c1, 1502px 862px #2485c1, 1780px 488px #2485c1,
  1881px 1191px #2485c1, 1063px 876px #2485c1, 1614px 1073px #2485c1,
  1414px 666px #2485c1, 1865px 289px #2485c1, 687px 352px #2485c1,
  1329px 1312px #2485c1, 279px 136px #2485c1, 475px 756px #2485c1,
  1177px 435px #2485c1, 1264px 921px #2485c1, 467px 1496px #2485c1,
  391px 1359px #2485c1, 666px 1083px #2485c1, 1526px 1251px #2485c1,
  594px 564px #2485c1, 991px 525px #2485c1, 1511px 875px #2485c1,
  1935px 1049px #2485c1, 1471px 1430px #2485c1, 959px 604px #2485c1,
  1685px 72px #2485c1, 1505px 1876px #2485c1, 509px 1627px #2485c1,
  1065px 978px #2485c1, 1860px 884px #2485c1, 1038px 464px #2485c1,
  1051px 106px #2485c1, 1056px 728px #2485c1, 1953px 45px #2485c1,
  1483px 638px #2485c1, 559px 845px #2485c1, 1184px 922px #2485c1,
  1320px 1117px #2485c1, 1572px 747px #2485c1, 1971px 43px #2485c1,
  665px 13px #2485c1, 1457px 1153px #2485c1, 848px 154px #2485c1,
  1039px 1837px #2485c1, 878px 795px #2485c1, 1286px 1705px #2485c1,
  1946px 1143px #2485c1, 1114px 1166px #2485c1, 1747px 874px #2485c1,
  1894px 636px #2485c1, 1316px 541px #2485c1, 1953px 1620px #2485c1,
  1446px 1773px #2485c1, 974px 833px #2485c1;
}

.starry-warpper .stars3 {
  -webkit-animation: y 100s linear infinite;
  animation: y 100s linear infinite;
}

.starry-warpper .stars3,
.starry-warpper .stars3:after {
  width: 3px;
  height: 3px;
  background: transparent;
  -webkit-box-shadow: 519px 875px #2485c1, 1497px 751px #2485c1,
  1256px 88px #2485c1, 1168px 1791px #2485c1, 1884px 109px #2485c1,
  1465px 451px #2485c1, 450px 370px #2485c1, 1560px 703px #2485c1,
  1788px 1997px #2485c1, 1047px 963px #2485c1, 1281px 119px #2485c1,
  439px 96px #2485c1, 164px 1956px #2485c1, 1360px 930px #2485c1,
  1387px 347px #2485c1, 1073px 1970px #2485c1, 1296px 284px #2485c1,
  25px 1602px #2485c1, 455px 944px #2485c1, 1177px 738px #2485c1,
  633px 1142px #2485c1, 1730px 1079px #2485c1, 1283px 1606px #2485c1,
  674px 1186px #2485c1, 513px 166px #2485c1, 1077px 636px #2485c1,
  1811px 580px #2485c1, 971px 1789px #2485c1, 694px 1756px #2485c1,
  703px 1138px #2485c1, 1290px 942px #2485c1, 351px 1509px #2485c1,
  1904px 790px #2485c1, 68px 819px #2485c1, 1097px 362px #2485c1,
  1035px 331px #2485c1, 180px 940px #2485c1, 1776px 1229px #2485c1,
  1487px 781px #2485c1, 1131px 1765px #2485c1, 1684px 536px #2485c1,
  939px 367px #2485c1, 1102px 1481px #2485c1, 741px 887px #2485c1,
  167px 1132px #2485c1, 1756px 529px #2485c1, 608px 758px #2485c1;
  box-shadow: 519px 875px #2485c1, 1497px 751px #2485c1, 1256px 88px #2485c1,
  1168px 1791px #2485c1, 1884px 109px #2485c1, 1465px 451px #2485c1,
  450px 370px #2485c1, 1560px 703px #2485c1, 1788px 1997px #2485c1,
  1047px 963px #2485c1, 1281px 119px #2485c1, 439px 96px #2485c1,
  164px 1956px #2485c1, 1360px 930px #2485c1, 1387px 347px #2485c1,
  1073px 1970px #2485c1, 1296px 284px #2485c1, 25px 1602px #2485c1,
  455px 944px #2485c1, 1177px 738px #2485c1, 633px 1142px #2485c1,
  1730px 1079px #2485c1, 1283px 1606px #2485c1, 674px 1186px #2485c1,
  513px 166px #2485c1, 1077px 636px #2485c1, 1811px 580px #2485c1,
  971px 1789px #2485c1, 694px 1756px #2485c1, 703px 1138px #2485c1,
  1290px 942px #2485c1, 351px 1509px #2485c1, 1904px 790px #2485c1,
  68px 819px #2485c1, 1097px 362px #2485c1, 1035px 331px #2485c1,
  180px 940px #2485c1, 1776px 1229px #2485c1, 1487px 781px #2485c1,
  1131px 1765px #2485c1, 1684px 536px #2485c1, 939px 367px #2485c1,
  1102px 1481px #2485c1, 741px 887px #2485c1, 167px 1132px #2485c1,
  1756px 529px #2485c1, 608px 758px #2485c1;
}

.starry-warpper .stars3:after {
  content: ' ';
  position: absolute;
  top: 2000px;
}

@keyframes y {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }

  to {
    -webkit-transform: translateY(-2000px);
    transform: translateY(-2000px);
  }
}
</style>
