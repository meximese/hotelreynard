import type {Menu, MenuItem, MenuPrice} from "@/lib/content/types";

function formatPrice(price: MenuPrice) {
  const amount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: price.amount % 1 === 0 ? 0 : 2,
  }).format(price.amount);

  return price.label ? `${amount} / ${price.label}` : amount;
}

function itemPrices(item: MenuItem) {
  if (item.multiplePrices && item.prices?.length) {
    return item.prices;
  }

  return item.price ? [item.price] : [];
}

export function MenuRenderer({menu}: {menu: Menu}) {
  return (
    <div className="menu-renderer">
      {menu.intro ? <p className="menu-intro">{menu.intro}</p> : null}
      <div className="menu-sections">
        {menu.sections.map((section, sectionIndex) => (
          <section className="menu-section" key={section._key || `${section.title}-${sectionIndex}`}>
            <header className="menu-section__header">
              <h2>{section.title}</h2>
              {section.description ? <p>{section.description}</p> : null}
            </header>
            <ul className="menu-items">
              {section.items.map((item, itemIndex) => (
                <li className="menu-item" key={item._key || `${item.name}-${itemIndex}`}>
                  <div className="menu-item__copy">
                    <h3>{item.name}</h3>
                    {item.description ? <p>{item.description}</p> : null}
                  </div>
                  {itemPrices(item).length ? (
                    <div className="menu-item__prices" aria-label="Prices">
                      {itemPrices(item).map((price, priceIndex) => (
                        <span key={`${price.label || price.amount}-${priceIndex}`}>
                          {formatPrice(price)}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
