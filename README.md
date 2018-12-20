# owlNrows
Script baseado no owl2rows (https://github.com/solversgroup/owl2rows), considerando N linhas para o carousel Owl  (https://github.com/OwlCarousel2/OwlCarousel2) ao invés de apenas duas.

## Forma de uso

```
$(".owl-carousel").owlCarousel({
   owlNrow: true,
   owlNrowN: 5, //numero de linhas
});
```

### Configurações
As demais configurações são as mesmas do Owl-Carousel e do owl2rows.
A exceção é que a funcionalidade 'ltr' do owl2rows não foi implementada.
