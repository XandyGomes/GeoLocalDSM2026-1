import * as Location from "expo-location"; // Módulo de localizaçõ do Expo
import { useEffect, useState } from "react"; // Os Hooks de Efeitos Colaterais e Estado/Ciclo de Vida do React

export default function useLocation() {
  const [coords, setCoords] = useState(0);
  const [errorMsg, setErrorMsg] = useState(0);

  useEffect(() => {
    // Efeito colateral para obter a localização
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync(); // Solicita permissão para acessar a localização
      if (status !== "granted") {
        setErrorMsg("Permissão negada para acessar a localização");
        return;
      }
      let location = await Location.getCurrentPositionAsync({}); // Obtém a localização atual
      setCoords({
        latitude: location.coords.latitude, // Define as coordenadas de latitude
        longitude: location.coords.longitude, // Define as coordenadas de latitude
      }); // Atualiza o estado com as coordenadas obtidas
    })(); // Função auto-invoca para obter a localização
  }, []); // O array vazio [] significa que o efeito só será executado um vez (semelhante ao componentDidMount)
  return { coords, errorMsg };
}
