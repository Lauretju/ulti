import { useState } from "react";

export default function Body() {
  const data = [
    {
      id: 1,
      name: "Brownie",
      image: "brownie",
      description: "Clásico brownie de chocolate, húmedo y denso, con un intenso sabor a cacao.",
      price: 600,
      imgSrc: "/img/brownie.png",
    },
    {
      id: 2,
      name: "Budin de Chocolate",
      image: "budin",
      description: "Budín húmedo y suave, con un sabor profundo a chocolate que lo convierte en un clásico irresistible.",
      price: 1700,
      imgSrc: "/img/budin.png",
    },
    {
      id: 3,
      name: "Budin de Vainilla",
      image: "bvai",
      description: "Delicado y esponjoso, con suave aroma y sabor a vainilla. Perfecto para un desayuno o merienda liviana.",
      price: 1700,
      imgSrc: "/img/bvai.png",
    },
    {
      id: 4,
      name: "Budin Marmolado",
      image: "marmo",
      description: "La combinación perfecta de chocolate y vainilla en un budín esponjoso con un diseño veteado que conquista.",
      price: 1700,
      imgSrc: "/img/marmo.png",
    },
    {
      id: 5,
      name: "Muffin de Chocolate",
      image: "muffin",
      description: "Muffin esponjoso y suave, con rico sabor a chocolate y un toque dulce perfecto para cualquier momento del día.",
      price: 500,
      imgSrc: "/img/muffin.png",
    },
    {
      id: 6,
      name: "Muffin Vainilla",
      image: "cupcakes",
      description: "Muffin ligero y aromático con sabor a vainilla, ideal para acompañar con café o té.",
      price: 500,
      imgSrc: "/img/cupcakes.png",
    },
  ];

  const [cart, setCart] = useState({});
  const [cartVisible, setCartVisible] = useState(false);
  const [mostrarPagoOptions, setMostrarPagoOptions] = useState(false);

  // Generate a random order number
  function generateOrderNumber() {
    return Math.floor(1000 + Math.random() * 9000);
  }

  // Store order number in state so it remains consistent per session
  const [orderNumber] = useState(generateOrderNumber());

  function addToCart(prod) {
    setCart((prevCart) => {
      const quantity = prevCart[prod.id]?.quantity || 0;
      return {
        ...prevCart,
        [prod.id]: {
          ...prod,
          quantity: quantity + 1,
        },
      };
    });
  }

  function incrementQuantity(prodId) {
    setCart((prevCart) => {
      if (!prevCart[prodId]) return prevCart;
      return {
        ...prevCart,
        [prodId]: {
          ...prevCart[prodId],
          quantity: prevCart[prodId].quantity + 1,
        },
      };
    });
  }

  function decrementQuantity(prodId) {
    setCart((prevCart) => {
      if (!prevCart[prodId]) return prevCart;
      const newQuantity = prevCart[prodId].quantity - 1;
      if (newQuantity <= 0) {
        const { [prodId]: _, ...rest } = prevCart;
        return rest;
      }
      return {
        ...prevCart,
        [prodId]: {
          ...prevCart[prodId],
          quantity: newQuantity,
        },
      };
    });
  }

  function vaciarCarrito() {
    setCart({});
    setMostrarPagoOptions(false);
  }

  function togglePagoOptions() {
    setMostrarPagoOptions((prev) => !prev);
  }

  const totalPrice = Object.values(cart).reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Function to open WhatsApp chat with formatted message
  function finalizarCompraWhatsApp() {
    if (Object.keys(cart).length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    const phoneNumber = "5493541398030"; // Número de WhatsApp

    // Construir la lista de productos con cantidades y precios
    const productsList = Object.values(cart)
      .map((item) => `${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`)
      .join("\n");

    let message =
      `Hola, vengo de la página web a enviar el comprobante de mi compra con los detalles. 🥰💗\n` +
      `Número de orden: ${orderNumber}\n\n` +
      `${productsList}\n\n` +
      `Total: $${totalPrice.toFixed(2)}`;

    const url = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");

    vaciarCarrito();
    setMostrarPagoOptions(false);
  }

  // Función para copiar el alias al portapapeles
  function copiarAlias() {
    const alias = "gossip.cake";
    navigator.clipboard.writeText(alias).then(() => {
      alert("Alias copiado: " + alias);
    }).catch(err => {
      console.error("Error al copiar el alias: ", err);
    });
  }

  return (
    <>
      <section
        id="intro"
        style={{
          width: "100vw",
          overflowX: "hidden",
          marginLeft: "calc(-50vw + 50%)",
          display: "flex",
          justifyContent: "center",
          paddingLeft: "10px",
        }}
      >
        <img
          src="/img/heddd.svg"
          alt="header"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            maxWidth: "100%",
            objectFit: "contain",
          }}
        />
      </section>

      <main
        className="mt-4"
        style={{
          marginTop: 0,
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "1200px",
        }}
      >
        <div className="container">
          <h2
            className="texti mb-4"
            style={{
              marginTop: "2rem",
              marginBottom: "2rem",
              fontSize: "1.5rem",
            }}
          >
            Nuestras opciones
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
            id="productos"
          >
            {data.map((prod) => (
              <div
                key={prod.id}
                style={{
                  backgroundColor: "#f8bbd0",
                  border: "2px solid #ec407a",
                  borderRadius: "10px",
                  padding: "0.8rem",
                  textAlign: "center",
                  boxShadow: "0 4px 10px rgba(236,64,122,0.4)",
                  fontSize: "0.9rem",
                  transition: "transform 0.3s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <img
                  src={prod.imgSrc}
                  alt={prod.name}
                  style={{
                    width: "180px",
                    height: "180px",
                    objectFit: "cover",
                    marginBottom: "0.8rem",
                    borderRadius: "8px",
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  onError={(e) => {
                    e.target.style.display = "none";
                    console.error("Error cargando imagen:", e.target.src);
                  }}
                />
                <h3
                  className="fs-5 fw-bold text-uppercase"
                  style={{
                    marginBottom: "0.3rem",
                    color: "#ec407a",
                    fontFamily: "'Arial', sans-serif",
                  }}
                >
                  {prod.name}
                </h3>
                <p
                  style={{
                    marginBottom: "0.3rem",
                    fontSize: "0.85rem",
                    color: "#333",
                  }}
                >
                  {prod.description}
                </p>
                <p className="fw-bold text-primary fs-4" style={{ marginBottom: "0" }}>
                  ${prod.price}
                </p>
                <button
                  onClick={() => addToCart(prod)}
                  style={{
                    marginTop: "0.8rem",
                    backgroundColor: "#ec407a",
                    color: "white",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#d81b60")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#ec407a")
                  }
                  aria-label={`Añadir ${prod.name} al carrito`}
                >
                  Añadir al carrito
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Botón icono carrito fijo arriba derecha */}
        <button
          onClick={() => setCartVisible(!cartVisible)}
          aria-label={cartVisible ? "Cerrar carrito" : "Abrir carrito"}
          title={cartVisible ? "Cerrar carrito" : "Abrir carrito"}
          style={{
            position: "fixed",
            top: "1rem",
            right: "1rem",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "none",
            backgroundColor: "#ec407a",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(236,64,122,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1100,
            padding: 0,
          }}
        >
          <img
            src="/img/carrito.png"
            alt="Carrito"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </button>

        {/* Panel carrito, se muestra solo si cartVisible=true */}
        <section
          style={{
            position: "fixed",
            top: "60px",
            right: cartVisible ? "1rem" : "-320px",
            width: "320px",
            maxHeight: "90vh",
            overflowY: "auto",
            padding: "1rem",
            border: "2px solid #ec407a",
            borderRadius: "10px",
            backgroundColor: "#fff0f6",
            boxShadow: "0 4px 15px rgba(236,64,122,0.4)",
            zIndex: 1050,
            transition: "right 0.3s ease",
          }}
          aria-label="Carrito de compras"
        >
          <h3 style={{ color: "#ec407a", fontFamily: "'Arial', sans-serif" }}>
            Carrito
          </h3>
          {Object.keys(cart).length === 0 ? (
            <p style={{ color: "#555" }}>El carrito está vacío.</p>
          ) : (
            <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
              {Object.values(cart).map((item) => (
                <li
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "0.5rem",
                    fontFamily: "'Arial', sans-serif",
                    color: "#333",
                    gap: "0.5rem",
                    flexWrap: "nowrap",
                  }}
                >
                  {/* Imagen del producto */}
                  <img
                    src={item.imgSrc}
                    alt={item.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "4px",
                      flexShrink: 0,
                    }}
                  />

                  {/* Nombre y cantidad */}
                  <span
                    style={{
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      fontSize: "0.9rem",
                      flexShrink: 1,
                      minWidth: 0,
                    }}
                    title={`${item.name} x ${item.quantity}`}
                    aria-label={`${item.name}, cantidad ${item.quantity}`}
                  >
                    {item.name} x {item.quantity}
                  </span>

                  {/* Controles botones + precio agrupados */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      flexShrink: 0,
                      minWidth: 130,
                      justifyContent: "flex-end",
                    }}
                  >
                    <button
                      onClick={() => decrementQuantity(item.id)}
                      aria-label={`Quitar una unidad de ${item.name}`}
                      style={{
                        backgroundColor: "#ff4081",
                        border: "none",
                        color: "white",
                        borderRadius: "4px",
                        width: "28px",
                        height: "28px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        fontSize: "18px",
                        lineHeight: "18px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 0,
                      }}
                    >
                      −
                    </button>
                    <button
                      onClick={() => incrementQuantity(item.id)}
                      aria-label={`Agregar una unidad de ${item.name}`}
                      style={{
                        backgroundColor: "#4caf50",
                        border: "none",
                        color: "white",
                        borderRadius: "4px",
                        width: "28px",
                        height: "28px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        fontSize: "18px",
                        lineHeight: "18px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 0,
                      }}
                    >
                      +
                    </button>

                    {/* Precio total por ítem */}
                    <span
                      style={{
                        fontWeight: "bold",
                        minWidth: "60px",
                        textAlign: "right",
                        fontSize: "0.9rem",
                      }}
                    >
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {Object.keys(cart).length > 0 && (
            <>
              <p
                style={{
                  fontWeight: "bold",
                  color: "#ec407a",
                  fontFamily: "'Arial', sans-serif",
                  fontSize: "1.1rem",
                }}
              >
                Total: ${totalPrice.toFixed(2)}
              </p>

              {/* Botones para vaciar carrito e ir a pagar */}
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  marginTop: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={vaciarCarrito}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#ec407a",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontFamily: "'Arial', sans-serif",
                    flexGrow: 1,
                    minWidth: "120px",
                  }}
                >
                  Vaciar carrito
                </button>
                <button
                  onClick={togglePagoOptions}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#ff4081",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontFamily: "'Arial', sans-serif",
                    flexGrow: 1,
                    minWidth: "120px",
                  }}
                  aria-expanded={mostrarPagoOptions}
                  aria-controls="alias-transferencia-section"
                >
                  Ir a pagar
                </button>
              </div>

              {/* Panel alias y finalizar compra */}
              {mostrarPagoOptions && (
                <section
                  id="alias-transferencia-section"
                  style={{
                    marginTop: "1rem",
                    padding: "1rem",
                    border: "2px solid #ff4081",
                    borderRadius: "10px",
                    backgroundColor: "#ffe6f0",
                    fontFamily: "'Arial', sans-serif",
                    color: "#c2185b",
                    textAlign: "center",
                    fontSize: "1rem",
                  }}
                >
                  <p style={{ marginBottom: "1rem" }}>
                    <strong style={{ color: "#e91e63" }}>
                      Alias para transferir: gossip.cake
                    </strong>
                    <img
                      src="/img/copiar.png"
                      alt="Copiar"
                      style={{
                        width: "20px", // Ajusta el tamaño según sea necesario
                        height: "20px",
                        cursor: "pointer",
                        marginLeft: "0.5rem", // Espacio entre el texto y la imagen
                      }}
                      onClick={copiarAlias} // Hacer que la imagen copie el alias al hacer clic
                    />
                  </p>
                  <button
                    onClick={finalizarCompraWhatsApp}
                    style={{
                      padding: "0.75rem 1.5rem",
                      backgroundColor: "#e91e63",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "1rem",
                      transition: "background-color 0.3s ease",
                      marginTop: "0.5rem", // Espacio entre el botón de finalizar compra y la fila anterior
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#ad145"
                                            )}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#e91e63")
                    }
                  >
                    Finalizar compra
                  </button>
                </section>
              )}
            </>
          )}
        </section>
      </main>
    </>
  );
}
