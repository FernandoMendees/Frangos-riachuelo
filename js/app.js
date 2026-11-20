const CONFIG = {
  businessName: "Frango Assado Riachuelo",
  whatsappNumber: "5534997178914",
  businessAddress: "Rua Riachuelo - 165 - Boa Vista",

  prices: {
    delivery: 0,
  },

  products: [
    {
      id: "frango-assado",
      name: "Frango Assado",
      description: "",
      price: 55.00,
      image: "assets/frango-assado.jpg",
      available: true,
    },
    {
      id: "maionese-caseira",
      name: "Maionese Caseira",
      description: "",
      price: 10.00,
      image: "https://images.pexels.com/photos/39470258/pexels-photo-39470258.jpeg?auto=compress&cs=tinysrgb&w=1200",
      available: true,
    },
    {
      id: "feijao-tropeiro",
      name: "Feijão Tropeiro",
      description: "",
      price: 15.00,
      image: "assets/feijao-tropeiro.jpg",
      available: true,
    },
    {
      id: "porcoes-batata",
      name: "Porções de Batata",
      description: "",
      price: 10.00,
      image: "assets/batata-rustica.jpg",
      available: true,
    },
  ],
};

(function () {
  "use strict";
  const DELIVERY_FEE_CENTS = 0;
  const PLACEHOLDER_DESCRIPTION = "";
  const PLACEHOLDER_PRICE_LABEL = "";

  const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const ICONS = {
    plus: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
    minus: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none"><path d="M5 12h14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
    trash: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none"><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-9 0 1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    add: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
  };

  const FALLBACK_ICONS = {
    "frango-assado":
      '<svg viewBox="0 0 120 120" width="48" height="48" fill="none"><path d="M60 24c-15 0-25.5 12-25.5 27 0 10.5 4.8 18.4 10.5 24-3.7 1.5-7 3.7-9.7 6.7-.9 1 .1 2.6 1.5 2.4 5.2-1 10.5-1.5 15.4-1.2v6c0 1.2 1 2.2 2.2 2.2h11.2c1.2 0 2.2-1 2.2-2.2v-6c4.9-.3 10.2.2 15.4 1.2 1.4.2 2.4-1.4 1.5-2.4-2.7-3-6-5.2-9.7-6.7 5.7-5.6 10.5-13.5 10.5-24 0-15-10.5-27-25.5-27Z" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><path d="M51 41.5c2.3-2.6 4.8-3.8 7.5-3.8s5.2 1.2 7.5 3.8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    "maionese-caseira":
      '<svg viewBox="0 0 120 120" width="48" height="48" fill="none"><path d="M38 52h44l-4 38a6 6 0 0 1-6 5.4H48a6 6 0 0 1-6-5.4l-4-38Z" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><path d="M34 52c0-7 11.6-12.5 26-12.5S86 45 86 52" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M48 39.5c0-5 5.4-9 12-9s12 4 12 9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    "feijao-tropeiro":
      '<svg viewBox="0 0 120 120" width="48" height="48" fill="none"><path d="M26 58c0-3.3 2.7-6 6-6h56c3.3 0 6 2.7 6 6 0 18-15.3 32-34 32S26 76 26 58Z" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><circle cx="48" cy="58" r="2.6" fill="currentColor"/><circle cx="60" cy="63" r="2.6" fill="currentColor"/><circle cx="72" cy="57" r="2.6" fill="currentColor"/><circle cx="54" cy="68" r="2.6" fill="currentColor"/><path d="M44 44c1.5-4 3-8 1.5-13M60 42c1.5-4 1.5-8 0-13M76 44c1.5-4 3-8 1.5-13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    "porcoes-batata":
      '<svg viewBox="0 0 120 120" width="48" height="48" fill="none"><path d="M44 50l-6 42c-.3 2 1.3 3.8 3.3 3.8h37.4c2 0 3.6-1.8 3.3-3.8l-6-42" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><path d="M40 50h40l3-12H37l3 12Z" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><path d="M52 55v30M60 55v34M68 55v30" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
  };
  const DEFAULT_FALLBACK_ICON =
    '<svg viewBox="0 0 120 120" width="48" height="48" fill="none"><circle cx="60" cy="60" r="30" stroke="currentColor" stroke-width="2.2"/></svg>';

  const cart = new Map();

  let lastFocusedElement = null;

  const dom = {};

  function cacheDom() {
    dom.productGrid = document.getElementById("product-grid");
    dom.cartList = document.getElementById("cart-list");
    dom.cartEmpty = document.getElementById("cart-empty");
    dom.cartBadge = document.getElementById("cart-badge");
    dom.cartTrigger = document.getElementById("cart-trigger");

    dom.overlay = document.getElementById("drawer-overlay");
    dom.drawer = document.getElementById("order-drawer");
    dom.drawerClose = document.getElementById("drawer-close");

    dom.fulfillmentRadios = document.querySelectorAll('input[name="fulfillment"]');
    dom.addressWrap = document.getElementById("delivery-address-wrap");
    dom.addressField = document.getElementById("customer-address");
    dom.addressError = document.getElementById("address-error");
    dom.pickupWrap = document.getElementById("pickup-address-wrap");
    dom.pickupAddressText = document.getElementById("pickup-address-text");

    dom.nameField = document.getElementById("customer-name");
    dom.nameError = document.getElementById("name-error");
    dom.notesField = document.getElementById("customer-notes");

    dom.summarySubtotal = document.getElementById("summary-subtotal");
    dom.summaryDelivery = document.getElementById("summary-delivery");
    dom.summaryTotal = document.getElementById("summary-total");
    dom.checkoutError = document.getElementById("checkout-error");
    dom.checkoutButton = document.getElementById("checkout-button");

    dom.heroImage = document.getElementById("hero-image");
    dom.footerAddressText = document.getElementById("footer-address-text");
    dom.footerWhatsapp = document.getElementById("footer-whatsapp");
    dom.footerYear = document.getElementById("footer-year");

    dom.toast = document.getElementById("toast");
  }
  function formatBRL(cents) {
    return currencyFormatter.format(cents / 100);
  }

  function priceToCents(price) {
    if (price === null || price === undefined || isNaN(price)) return null;
    return Math.round(price * 100);
  }

  function getProductById(id) {
    return CONFIG.products.find((p) => p.id === id);
  }

  function escapeHtml(value) {
    const div = document.createElement("div");
    div.textContent = value == null ? "" : String(value);
    return div.innerHTML;
  }

  function attachImageFallback(imgEl) {
    imgEl.addEventListener(
      "error",
      function onError() {
        imgEl.style.display = "none";
        const fallback = imgEl.nextElementSibling;
        if (fallback && fallback.classList.contains("media-fallback")) {
          fallback.classList.add("is-visible");
        }
        imgEl.removeEventListener("error", onError);
      },
      { once: true }
    );
  }

  function showToast(message) {
    dom.toast.textContent = message;
    dom.toast.classList.add("is-visible");
    window.clearTimeout(showToast._timer);
    showToast._timer = window.setTimeout(() => {
      dom.toast.classList.remove("is-visible");
    }, 2200);
  }

  function renderProductGrid() {
    dom.productGrid.innerHTML = "";

    CONFIG.products.forEach((product) => {
      const li = document.createElement("li");
      li.className = "product-card" + (!product.available ? " product-card--unavailable" : "");

      const priceCents = priceToCents(product.price);
      const priceHtml =
        priceCents === null
          ? `<span class="product-card__price product-card__price--pending">${PLACEHOLDER_PRICE_LABEL}</span>`
          : `<span class="product-card__price">${formatBRL(priceCents)}</span>`;

      const canAdd = product.available && priceCents !== null;
      const buttonLabel = !product.available
        ? "Indisponível"
        : priceCents === null
        ? "Preço a definir"
        : "Adicionar ao pedido";

      li.innerHTML = `
        <div class="product-media">
          <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy">
          <div class="media-fallback" aria-hidden="true">
            ${FALLBACK_ICONS[product.id] || DEFAULT_FALLBACK_ICON}
            <span>Foto em breve</span>
          </div>
        </div>
        <div class="product-card__body">
          ${!product.available ? '<span class="product-card__tag">Indisponível no momento</span>' : ""}
          <h3 class="product-card__name">${escapeHtml(product.name)}</h3>
          <p class="product-card__description">${escapeHtml(product.description) || PLACEHOLDER_DESCRIPTION}</p>
          <div class="product-card__footer">
            ${priceHtml}
            <button type="button" class="product-card__add" data-product-id="${product.id}" ${canAdd ? "" : "disabled"}>
              ${buttonLabel}
            </button>
          </div>
        </div>
      `;

      dom.productGrid.appendChild(li);

      const img = li.querySelector(".product-media img");
      attachImageFallback(img);
    });

    dom.productGrid.querySelectorAll(".product-card__add").forEach((button) => {
      button.addEventListener("click", () => {
        if (button.disabled) return;
        const productId = button.getAttribute("data-product-id");
        addToCart(productId);
        showToast(`${getProductById(productId).name} adicionado ao pedido`);
        pulseCartBadge();
        openDrawer(button);
      });
    });
  }

  function addToCart(productId) {
    const product = getProductById(productId);
    if (!product || !product.available || priceToCents(product.price) === null) return;
    const currentQty = cart.get(productId) || 0;
    cart.set(productId, currentQty + 1);
    renderCart();
  }

  function incrementItem(productId) {
    cart.set(productId, (cart.get(productId) || 0) + 1);
    renderCart();
  }

  function decrementItem(productId) {
    const qty = cart.get(productId) || 0;
    if (qty <= 1) return;
    cart.set(productId, qty - 1);
    renderCart();
  }

  function removeItem(productId) {
    cart.delete(productId);
    renderCart();
  }

  function getCartEntries() {
    return Array.from(cart.entries())
      .map(([productId, qty]) => {
        const product = getProductById(productId);
        if (!product) return null;
        const unitPriceCents = priceToCents(product.price);
        return {
          product,
          qty,
          unitPriceCents,
          subtotalCents: unitPriceCents === null ? null : unitPriceCents * qty,
        };
      })
      .filter(Boolean);
  }

  function calculateSubtotalCents(entries) {
    return entries.reduce((sum, entry) => sum + (entry.subtotalCents || 0), 0);
  }

  function calculateDeliveryFeeCents() {
    return DELIVERY_FEE_CENTS;
  }

  function renderCart() {
    const entries = getCartEntries();

    dom.cartList.innerHTML = "";
    entries.forEach((entry) => {
      const li = document.createElement("li");
      li.className = "cart-item";
      const unitLabel = entry.unitPriceCents === null ? PLACEHOLDER_PRICE_LABEL : formatBRL(entry.unitPriceCents);
      const subtotalLabel = entry.subtotalCents === null ? PLACEHOLDER_PRICE_LABEL : formatBRL(entry.subtotalCents);

      li.innerHTML = `
        <div class="cart-item__media">
          <img src="${escapeHtml(entry.product.image)}" alt="" loading="lazy">
          <div class="media-fallback" aria-hidden="true">
            ${FALLBACK_ICONS[entry.product.id] || DEFAULT_FALLBACK_ICON}
            <span>Foto em breve</span>
          </div>
        </div>
        <div class="cart-item__info">
          <p class="cart-item__name">${escapeHtml(entry.product.name)}</p>
          <p class="cart-item__unit-price">Valor unitário: ${unitLabel}</p>
          <div class="cart-item__row">
            <div class="qty-control">
              <button type="button" class="qty-decrement" aria-label="Diminuir quantidade de ${escapeHtml(entry.product.name)}">${ICONS.minus}</button>
              <span class="qty-control__value">${entry.qty}</span>
              <button type="button" class="qty-increment" aria-label="Aumentar quantidade de ${escapeHtml(entry.product.name)}">${ICONS.plus}</button>
            </div>
            <span class="cart-item__subtotal">${subtotalLabel}</span>
            <button type="button" class="cart-item__remove" aria-label="Remover ${escapeHtml(entry.product.name)} do pedido">${ICONS.trash}</button>
          </div>
        </div>
      `;

      li.querySelector(".qty-increment").addEventListener("click", () => incrementItem(entry.product.id));
      li.querySelector(".qty-decrement").addEventListener("click", () => decrementItem(entry.product.id));
      li.querySelector(".cart-item__remove").addEventListener("click", () => removeItem(entry.product.id));

      const img = li.querySelector(".cart-item__media img");
      attachImageFallback(img);

      dom.cartList.appendChild(li);
    });

    const isEmpty = entries.length === 0;
    dom.cartList.classList.toggle("is-empty", isEmpty);
    dom.cartEmpty.classList.toggle("is-visible", isEmpty);

    updateSummary(entries);
    updateCartBadge(entries);
  }

  function updateCartBadge(entries) {
    const totalItems = entries.reduce((sum, entry) => sum + entry.qty, 0);
    dom.cartBadge.textContent = String(totalItems);
    dom.cartBadge.hidden = totalItems === 0;
  }

  function pulseCartBadge() {
    dom.cartBadge.classList.remove("is-pulsing");
    void dom.cartBadge.offsetWidth;
    dom.cartBadge.classList.add("is-pulsing");
  }

  function updateSummary(entries) {
    const subtotalCents = calculateSubtotalCents(entries);
    const deliveryCents = calculateDeliveryFeeCents();
    const totalCents = subtotalCents + deliveryCents;

    dom.summarySubtotal.textContent = formatBRL(subtotalCents);
    dom.summaryDelivery.textContent = formatBRL(deliveryCents);
    dom.summaryTotal.textContent = formatBRL(totalCents);
  }

  function getFulfillmentMethod() {
    const checked = Array.from(dom.fulfillmentRadios).find((radio) => radio.checked);
    return checked ? checked.value : "entrega";
  }

  function handleFulfillmentChange() {
    const method = getFulfillmentMethod();
    const isDelivery = method === "entrega";
    dom.addressWrap.style.display = isDelivery ? "" : "none";
    dom.pickupWrap.hidden = isDelivery;
    if (isDelivery) {
      clearFieldError(dom.addressField, dom.addressError);
    }
  }

  function setFieldError(field, errorEl, message) {
    field.classList.add("has-error");
    field.setAttribute("aria-invalid", "true");
    errorEl.textContent = message;
    errorEl.hidden = false;
  }

  function clearFieldError(field, errorEl) {
    field.classList.remove("has-error");
    field.removeAttribute("aria-invalid");
    errorEl.hidden = true;
  }

  function setCheckoutError(message) {
    dom.checkoutError.textContent = message;
    dom.checkoutError.hidden = !message;
  }

  function validateOrder(entries) {
    setCheckoutError("");

    if (entries.length === 0) {
      setCheckoutError("Seu pedido está vazio. Adicione itens do cardápio para continuar.");
      return false;
    }

    const hasUnpricedItem = entries.some((entry) => entry.unitPriceCents === null);
    if (hasUnpricedItem) {
      setCheckoutError("Um dos itens do seu pedido ainda está com preço a definir. Remova-o para continuar.");
      return false;
    }

    let firstInvalidField = null;

    if (!dom.nameField.value.trim()) {
      setFieldError(dom.nameField, dom.nameError, "Informe seu nome para continuar.");
      firstInvalidField = firstInvalidField || dom.nameField;
    } else {
      clearFieldError(dom.nameField, dom.nameError);
    }

    const isDelivery = getFulfillmentMethod() === "entrega";
    if (isDelivery && !dom.addressField.value.trim()) {
      setFieldError(dom.addressField, dom.addressError, "Informe o endereço completo para entrega.");
      firstInvalidField = firstInvalidField || dom.addressField;
    } else {
      clearFieldError(dom.addressField, dom.addressError);
    }

    if (firstInvalidField) {
      firstInvalidField.focus();
      return false;
    }

    if (!CONFIG.whatsappNumber) {
      setCheckoutError(
        "Configuração pendente: adicione o número do WhatsApp em js/app.js (CONFIG.whatsappNumber) antes de publicar o site."
      );
      return false;
    }

    return true;
  }

  function buildWhatsAppMessage(entries) {
    const name = dom.nameField.value.trim();
    const notes = dom.notesField.value.trim();
    const isDelivery = getFulfillmentMethod() === "entrega";
    const address = dom.addressField.value.trim();

    const subtotalCents = calculateSubtotalCents(entries);
    const deliveryCents = calculateDeliveryFeeCents();
    const totalCents = subtotalCents + deliveryCents;

    const divider = "━━━━━━━━━━━━━━━━━━";
    const lines = [];

    lines.push("*NOME DO CLIENTE*");
    lines.push(`Nome: ${name}`);
    lines.push(divider);
    lines.push("*ITENS DO PEDIDO*");
    lines.push("");

    entries.forEach((entry) => {
      lines.push(`${entry.qty}x ${entry.product.name}`);
      lines.push(`Valor unitário: ${formatBRL(entry.unitPriceCents)}`);
      lines.push(`Subtotal: ${formatBRL(entry.subtotalCents)}`);
      lines.push("");
    });

    if (isDelivery) {
      lines.push("*ENTREGA GRÁTIS*");
      lines.push(`Endereço para entrega: ${address}.`);
    } else {
      lines.push("RETIRADA NO LOCAL.");
    }

    lines.push("*OBSERVAÇÕES*");
    lines.push(notes ? notes : "Sem observações.");
    lines.push("")

    lines.push("*RESUMO FINANCEIRO*");
    lines.push(`Subtotal dos produtos: ${formatBRL(subtotalCents)}`);
    lines.push(`Taxa de entrega: ${formatBRL(deliveryCents)}`);
    lines.push("")
    lines.push(`*TOTAL DO PEDIDO: ${formatBRL(totalCents)}*`);

    return lines.join("\n");
  }

  function handleCheckout() {
    const entries = getCartEntries();
    if (!validateOrder(entries)) return;

    const message = buildWhatsAppMessage(entries);
    const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener");
  }

  function getFocusableElements(container) {
    return Array.from(
      container.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => el.offsetParent !== null);
  }

  function trapFocus(event) {
    if (event.key !== "Tab") return;
    const focusable = getFocusableElements(dom.drawer);
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function handleDrawerKeydown(event) {
    if (event.key === "Escape") {
      closeDrawer();
    } else {
      trapFocus(event);
    }
  }

  function openDrawer(triggerEl) {
    lastFocusedElement = triggerEl || document.activeElement;

    dom.overlay.hidden = false;
    void dom.overlay.offsetWidth;
    dom.overlay.classList.add("is-visible");

    dom.drawer.classList.add("is-open");
    dom.drawer.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleDrawerKeydown);

    window.setTimeout(() => {
      dom.drawerClose.focus();
    }, 50);
  }

  function closeDrawer() {
    dom.drawer.classList.remove("is-open");
    dom.drawer.setAttribute("aria-hidden", "true");
    dom.overlay.classList.remove("is-visible");

    document.body.style.overflow = "";
    document.removeEventListener("keydown", handleDrawerKeydown);

    window.setTimeout(() => {
      dom.overlay.hidden = true;
    }, 320);

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  function initBusinessInfo() {
    if (CONFIG.businessAddress) {
      dom.footerAddressText.textContent = CONFIG.businessAddress;
      dom.pickupAddressText.textContent = CONFIG.businessAddress;
    }

    if (CONFIG.whatsappNumber) {
      const greeting = encodeURIComponent(
        `Olá! Gostaria de saber mais sobre o cardápio do ${CONFIG.businessName}.`
      );
      dom.footerWhatsapp.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${greeting}`;
    } else {
      dom.footerWhatsapp.addEventListener("click", (event) => {
        event.preventDefault();
        showToast("Configure o número do WhatsApp em js/app.js");
      });
    }

    dom.footerYear.textContent = String(new Date().getFullYear());
  }

  function bindEvents() {
    document.querySelectorAll("[data-open-cart]").forEach((trigger) => {
      trigger.addEventListener("click", () => openDrawer(trigger));
    });

    dom.cartTrigger.addEventListener("click", () => openDrawer(dom.cartTrigger));
    dom.drawerClose.addEventListener("click", closeDrawer);
    dom.overlay.addEventListener("click", closeDrawer);

    dom.fulfillmentRadios.forEach((radio) => {
      radio.addEventListener("change", handleFulfillmentChange);
    });

    dom.nameField.addEventListener("input", () => clearFieldError(dom.nameField, dom.nameError));
    dom.addressField.addEventListener("input", () => clearFieldError(dom.addressField, dom.addressError));

    dom.checkoutButton.addEventListener("click", handleCheckout);

    if (dom.heroImage) {
      attachImageFallback(dom.heroImage);
    }
  }

  function init() {
    cacheDom();
    renderProductGrid();
    renderCart();
    handleFulfillmentChange();
    initBusinessInfo();
    bindEvents();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
