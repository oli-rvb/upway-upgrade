
    (function() {
      var preconnectOrigins = ["https://cdn.shopify.com","https://extensions.shopifycdn.com"];
      var scripts = ["/cdn/shopifycloud/checkout-web/assets/c1/polyfills.BGEdQoKJ.js","/cdn/shopifycloud/checkout-web/assets/c1/app.CZsLyR3M.js","/cdn/shopifycloud/checkout-web/assets/c1/esnext-vendor.DUPUyqeN.js","/cdn/shopifycloud/checkout-web/assets/c1/browser.Cel20BFr.js","/cdn/shopifycloud/checkout-web/assets/c1/phone-phoneCountryCode.B-PV4bsu.js","/cdn/shopifycloud/checkout-web/assets/c1/Theme-utilities.Ou2Aw1Vr.js","/cdn/shopifycloud/checkout-web/assets/c1/images-payment-icon.C_9SDN8i.js","/cdn/shopifycloud/checkout-web/assets/c1/utilities-shop-discount-offer.CsAbi8Kh.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useUnauthenticatedErrorModal.COkYXnzF.js","/cdn/shopifycloud/checkout-web/assets/c1/extensibility-shared.CGomz5bP.js","/cdn/shopifycloud/checkout-web/assets/c1/shared-unactionable-errors.DznCsntX.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useShopPayProgressIntercepts.0klB5PTr.js","/cdn/shopifycloud/checkout-web/assets/c1/graphql-ShopPayCheckoutSessionQuery.FK9Vu3-B.js","/cdn/shopifycloud/checkout-web/assets/c1/helpers-setAddressErrors.CV5FhpOh.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useHasOrdersFromMultipleShops.ByqO59I9.js","/cdn/shopifycloud/checkout-web/assets/c1/images-flag-icon.C_eXYJRt.js","/cdn/shopifycloud/checkout-web/assets/c1/locale-fr.gKaYC-Gj.js","/cdn/shopifycloud/checkout-web/assets/c1/page-Information.D0Nq1vTX.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useGeneralPaymentErrorMessage.TMd-MdRa.js","/cdn/shopifycloud/checkout-web/assets/c1/CrossBorderConsolidation.-GJtsEBM.js","/cdn/shopifycloud/checkout-web/assets/c1/ProfilePreviewBar.Dcus-hgT.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useForceShopPayUrl.w_bzH9Y0.js","/cdn/shopifycloud/checkout-web/assets/c1/ShopPayLogo.D7T5xjcf.js","/cdn/shopifycloud/checkout-web/assets/c1/ShippingGroupsSummaryLine.BaRKK67z.js","/cdn/shopifycloud/checkout-web/assets/c1/StackedMerchandisePreview.VSasUl5a.js","/cdn/shopifycloud/checkout-web/assets/c1/ImpressionEventCapture.DXe35IS-.js","/cdn/shopifycloud/checkout-web/assets/c1/AutocompleteField-hooks.ABFYVU1n.js","/cdn/shopifycloud/checkout-web/assets/c1/Page.CqRQ7te7.js","/cdn/shopifycloud/checkout-web/assets/c1/component-RuntimeExtension.Bg3SSlYg.js","/cdn/shopifycloud/checkout-web/assets/c1/AnnouncementRuntimeExtensions.C3o7syWm.js","/cdn/shopifycloud/checkout-web/assets/c1/extension-targets-rendering-extension-targets.BbTFE72-.js","/cdn/shopifycloud/checkout-web/assets/c1/esm-browser-v4.BKrj-4V8.js","/cdn/shopifycloud/checkout-web/assets/c1/extension-targets-shipping-options.DLj2Dhg_.js","/cdn/shopifycloud/checkout-web/assets/c1/ExtensionsInner.B9g1Ehw_.js"];
      var styles = ["/cdn/shopifycloud/checkout-web/assets/c1/assets/app.1DbBqZa1.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/phoneCountryCode.Bz45BrAn.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/utilities.CO286Meg.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/useHasOrdersFromMultipleShops.BsSRKRJh.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/useGeneralPaymentErrorMessage.uqpm88mq.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/CrossBorderConsolidation.CRDql5Io.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/Page.BYM12A8B.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/ProfilePreviewBar.DjchwoxX.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/StackedMerchandisePreview.D6OuIVjc.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/RuntimeExtension.DWkDBM73.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/AnnouncementRuntimeExtensions.qDifMJI9.css"];
      var fontPreconnectUrls = [];
      var fontPrefetchUrls = [];
      var imgPrefetchUrls = ["https://cdn.shopify.com/s/files/1/0591/7769/7445/files/logo_x320.png?v=1679401702"];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = preconnectOrigins.concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res, next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        function run() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        }
        var next = (self.requestIdleCallback || setTimeout).bind(self, run);
        next();
      }

      function onLoaded() {
        try {
          if (parseFloat(navigator.connection.effectiveType) > 2 && !navigator.connection.saveData) {
            preconnectAssets();
            prefetchAssets();
          }
        } catch (e) {}
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  