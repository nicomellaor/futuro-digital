import type { Post } from '../data/posts'

type ArtworkProps = { post: Post }

function Scene({ id }: { id: string }) {
  switch (id) {
    case 'mundos-abiertos':
      return <>
        <path fill="#96b8bb" d="M0 0h600v750H0z" />
        <circle cx="452" cy="166" r="87" fill="#f8db9b" />
        <path fill="#486b76" d="m0 406 107-151 98 96 117-190 155 182 123-96v503H0z" />
        <path fill="#305263" d="m0 520 116-116 106 83 154-171 128 157 96-63v340H0z" />
        <path fill="#1d3b46" d="m0 614 111-60 88 47 117-75 112 40 93-66 79 54v196H0z" />
        <path fill="#d7ae77" d="m278 750 84-190 65-35 66 15-66 60-30 150z" />
        <path fill="#f3d49a" d="m304 750 76-156 27-16-49 172z" />
        <path fill="#243d47" d="M138 559h28v87h-28zM127 568h50v12h-50z" />
        <path fill="#e7ab6d" d="M135 545h33v19h-33z" />
        <path fill="#eaf0da" d="M86 118h8v8h-8zm21-24h8v8h-8zm399 223h7v7h-7z" />
        <text x="41" y="66" fill="#173d4b" fontSize="18" fontWeight="800" letterSpacing="4">NUEVOS HORIZONTES</text>
        <text x="40" y="714" fill="#fff5da" fontSize="49" fontWeight="900" letterSpacing="-3">SIGUE EL CAMINO</text>
      </>
    case 'marte':
      return <>
        <path fill="#e6d5c7" d="M0 0h600v750H0z" />
        <circle cx="416" cy="192" r="134" fill="#b66351" />
        <path fill="#c7795e" d="M332 119c65-61 144-47 193 13-43-17-71-8-112 20-31 22-57 28-93 20z" />
        <path fill="#a85649" d="M302 215c54-32 91-11 127 6 48 22 91 10 116-6-35 81-110 120-187 95z" />
        <circle cx="384" cy="205" r="18" fill="#995249" opacity=".6" />
        <path fill="#a67761" d="m0 503 103-81 98 51 132-96 130 97 137-94v370H0z" />
        <path fill="#875b51" d="m0 599 129-66 126 46 141-77 204 44v204H0z" />
        <path fill="#ead6ad" d="M167 529h186l-19 70H188z" />
        <path fill="#dfc8a5" d="M201 463h119l32 66H169z" />
        <path fill="#5b5e62" d="M194 601h41v32h-41zm106 0h41v32h-41z" />
        <path stroke="#5b5e62" strokeWidth="9" d="m243 462 27-56h55" fill="none" />
        <circle cx="326" cy="406" r="11" fill="#f8ebca" />
        <path stroke="#744f49" strokeWidth="6" d="M135 561h65m145 0h37" />
        <text x="42" y="69" fill="#713f3e" fontSize="18" fontWeight="800" letterSpacing="4">DIARIO ESPACIAL / 01</text>
        <text x="40" y="710" fill="#fff1d8" fontSize="73" fontWeight="900" letterSpacing="-4">MARTE</text>
      </>
    case 'playlist':
      return <>
        <path fill="#f0ddd1" d="M0 0h600v750H0z" />
        <path fill="#e0a896" d="M0 0h260l-80 275L0 348z" />
        <path fill="#f8ecdc" d="M50 79h499v592H50z" />
        <circle cx="297" cy="373" r="229" fill="#383c4e" />
        <circle cx="297" cy="373" r="195" fill="none" stroke="#5c6071" strokeWidth="2" />
        <circle cx="297" cy="373" r="154" fill="none" stroke="#5c6071" strokeWidth="2" />
        <circle cx="297" cy="373" r="108" fill="none" stroke="#5c6071" strokeWidth="2" />
        <circle cx="297" cy="373" r="77" fill="#e79b84" />
        <circle cx="297" cy="373" r="15" fill="#f8ecdc" />
        <path stroke="#ede6d8" strokeWidth="13" fill="none" strokeLinecap="round" d="M487 167v254l-114 86" />
        <circle cx="370" cy="510" r="19" fill="#ede6d8" />
        <text x="76" y="106" fill="#4a3c42" fontSize="18" fontWeight="800" letterSpacing="4">LA LISTA / VOL. 01</text>
        <text x="84" y="649" fill="#4a3c42" fontSize="36" fontWeight="900" letterSpacing="-1">PONLE PLAY OTRA VEZ</text>
      </>
    case 'robot-casero':
      return <>
        <path fill="#d6e5db" d="M0 0h600v750H0z" />
        <path fill="#98b8a4" d="M0 546h600v204H0z" />
        <path fill="#c18a70" d="M0 559h600v30H0z" />
        <path stroke="#5e8580" strokeWidth="14" strokeLinecap="round" d="M300 205v-61m0 0h73M158 410l-64 58m347-58 65 58" />
        <circle cx="376" cy="145" r="16" fill="#df8d6e" />
        <path fill="#649c9b" d="M174 238h251v219H174z" />
        <path fill="#47827f" d="M149 275h26v133h-26zm277 0h26v133h-26z" />
        <circle cx="247" cy="324" r="33" fill="#faf3df" />
        <circle cx="352" cy="324" r="33" fill="#faf3df" />
        <circle cx="247" cy="324" r="11" fill="#293e45" />
        <circle cx="352" cy="324" r="11" fill="#293e45" />
        <path stroke="#f0d0a9" strokeWidth="12" strokeLinecap="round" d="M264 397q36 22 72 0" fill="none" />
        <path fill="#496e69" d="M208 457h183v93H208zM230 550h37v52h-37zm104 0h37v52h-37z" />
        <path fill="#edca95" d="M94 581h71v15H94zm392 15h44v-58h-44z" />
        <text x="42" y="73" fill="#315e5c" fontSize="18" fontWeight="800" letterSpacing="4">HECHO EN CASA</text>
        <text x="41" y="711" fill="#294e4b" fontSize="62" fontWeight="900" letterSpacing="-3">HOLA, HUMANO</text>
      </>
    case 'cancha':
      return <>
        <path fill="#d9dfc4" d="M0 0h600v750H0z" />
        <path fill="#578669" d="M41 102h518v560H41z" />
        <path fill="#659578" d="M41 102h104v560H41zm208 0h104v560H249zm208 0h102v560H457z" />
        <path stroke="#d8e9d4" strokeWidth="5" fill="none" d="M65 127h470v510H65zm0 255h470M300 127v510m-83-255a83 83 0 1 0 166 0 83 83 0 1 0-166 0" />
        <path stroke="#d8e9d4" strokeWidth="5" fill="none" d="M65 285h75v194H65zm395 0h75v194h-75z" />
        <circle cx="352" cy="432" r="73" fill="#f6f2df" />
        <path fill="#3d5052" d="m352 397 33 25-13 39h-40l-13-39z" />
        <path stroke="#3d5052" strokeWidth="7" fill="none" d="m352 397 5-36m28 61 30-9m-43 48 16 30m-56-30-18 29m5-68-31-10" />
        <text x="44" y="76" fill="#315b4b" fontSize="18" fontWeight="800" letterSpacing="4">EL JUEGO SIGUE</text>
        <text x="40" y="718" fill="#315b4b" fontSize="55" fontWeight="900" letterSpacing="-3">UNA MÁS Y VAMOS</text>
      </>
    case 'color':
      return <>
        <path fill="#e8e3d6" d="M0 0h600v750H0z" />
        <path fill="#e7a071" d="M43 200c102-77 195-98 238-24 44 74-12 131-90 180-78 49-138 41-158-16-19-56-5-117 10-140z" />
        <path fill="#668991" d="M360 74c103 12 164 98 150 179-14 81-110 131-177 86-67-44-47-121-32-190 9-39 29-70 59-75z" />
        <path fill="#bea475" d="M283 382c131-99 260-56 258 58-1 113-121 180-239 145-117-35-118-132-19-203z" />
        <path fill="#d98076" d="M94 540c67-84 154-101 204-44s12 148-49 194H73c-34-47-21-98 21-150z" />
        <path stroke="#f8f0dc" strokeWidth="17" strokeLinecap="round" fill="none" d="M90 279c129-95 205-40 218 36m62-86c32-27 80-20 96 4M168 571c72-71 143-55 176-22" />
        <path stroke="#354b51" strokeWidth="9" strokeLinecap="round" fill="none" d="M206 122c82 26 58 83 11 102m210 212c-36 71-5 89 42 102" />
        <text x="43" y="75" fill="#344f55" fontSize="18" fontWeight="800" letterSpacing="4">PRUEBA DE COLOR 07</text>
        <text x="41" y="710" fill="#344f55" fontSize="70" fontWeight="900" letterSpacing="-4">SIN REGLAS</text>
      </>
    case 'cine':
      return <>
        <path fill="#292e42" d="M0 0h600v750H0z" />
        <path fill="#af776c" d="M44 150h512v438H44z" />
        <path fill="#e9c79a" d="M79 186h442v367H79z" />
        <path fill="#b66560" d="M104 206h392v330H104z" />
        <path fill="#343a51" d="M135 237h330v268H135z" />
        <circle cx="354" cy="334" r="89" fill="#e6b277" />
        <path fill="#5d687c" d="m135 505 114-133 64 64 96-111 56 66v114z" />
        <path fill="#313b50" d="m135 505 92-76 77 55 91-83 70 49v55z" />
        <path fill="#f3e7c9" d="M0 592h600v89H0z" />
        <path fill="#e7b776" d="M0 603h600v15H0z" />
        <circle cx="94" cy="134" r="10" fill="#f6d8a1" />
        <circle cx="300" cy="134" r="10" fill="#f6d8a1" />
        <circle cx="506" cy="134" r="10" fill="#f6d8a1" />
        <text x="60" y="101" fill="#f3e7c9" fontSize="18" fontWeight="800" letterSpacing="4">FUNCIÓN DE ESTA NOCHE</text>
        <text x="45" y="724" fill="#f3e7c9" fontSize="57" fontWeight="900" letterSpacing="-3">OTRA FUNCIÓN</text>
      </>
    case 'pixel-art':
      return <>
        <path fill="#cbd9cd" d="M0 0h600v750H0z" />
        <path fill="#a5c1b1" d="M53 121h494v494H53z" />
        <path fill="#6a8880" d="M89 157h422v422H89z" />
        <path fill="#d8bc88" d="M89 489h422v90H89z" />
        <path fill="#4c716c" d="M132 400h50v89h-50zm293-43h45v132h-45z" />
        <path fill="#e4b581" d="M208 237h184v52H208zM172 289h256v142H172zM211 431h180v46H211z" />
        <path fill="#b77a70" d="M251 237h98v48h-98zM212 341h59v48h-59zm117 0h59v48h-59z" />
        <path fill="#34545d" d="M223 312h47v34h-47zm108 0h47v34h-47zM270 403h61v28h-61z" />
        <path fill="#f3ddaa" d="M142 184h32v32h-32zm327 50h24v24h-24zm-62-49h15v15h-15z" />
        <text x="41" y="76" fill="#2f5653" fontSize="18" fontWeight="800" letterSpacing="4">HECHO PÍXEL A PÍXEL</text>
        <text x="42" y="712" fill="#2f5653" fontSize="63" fontWeight="900" letterSpacing="-3">NIVEL INFINITO</text>
      </>
    default:
      return <path fill="#e8e3d6" d="M0 0h600v750H0z" />
  }
}

export function PostArtwork({ post }: ArtworkProps) {
  return (
    <svg className="post__illustration" viewBox="0 0 600 750" role="img" aria-label={`Ilustración de ${post.category.toLowerCase()}: ${post.title}`}>
      <Scene id={post.id} />
    </svg>
  )
}
