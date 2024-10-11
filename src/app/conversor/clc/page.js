'use client';

import Pagina from "@/components/Pagina";
import { useState } from "react";
import { Button, CardImg, Form, Modal } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";

export default function ConversorMoedasPage() {
  const [valorReais, setValorReais] = useState('');
  const [moeda, setMoeda] = useState('');
  const [resultado, setResultado] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // Taxas de conversão atualizadas 
  const taxasConversao = {
    Dólar: 5.25, 
    Euro: 5.70,   
    Bitcoin: 0.00005, 
  };

  function converter(event) {
    event.preventDefault();

    const valorNumerico = Number(valorReais);
    if (valorNumerico <= 0 || !taxasConversao[moeda]) return; 

    const valorConvertido = valorNumerico * taxasConversao[moeda];
    setResultado(valorConvertido);
    setShowModal(true);
  }

  function limpar() {
    setValorReais('');
    setMoeda('');
    setResultado(0);
  }

  return (
    <Pagina titulo="Conversor de Moedas">
      <div>
        <CardImg src="/imagem/image.png" />
      </div>

      <Form onSubmit={converter}>
        <Form.Group className="mb-3">
          <Form.Label>Valor em Reais (R$):</Form.Label>
          <Form.Control
            type="number"
            required
            value={valorReais}
            onChange={e => setValorReais(e.target.value)}
            min={0.01}
            step={0.01}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Escolha a Moeda:</Form.Label>
          <Form.Select
            value={moeda}
            onChange={e => setMoeda(e.target.value)}
            required
          >
            <option value="">Selecione</option>
            <option value="Dólar">Dólar</option>
            <option value="Euro">Euro</option>
            <option value="Bitcoin">Bitcoin</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3 text-center">
          <Button type="submit" variant="success" className="me-2">
            <FaCheck /> Converter
          </Button>
          <Button variant="danger" onClick={limpar}>
            Limpar
          </Button>
        </Form.Group>
      </Form>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Resultado da Conversão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Valor Convertido: {resultado.toFixed(4)} {moeda}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </Pagina>
  );
}
