import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LineChart, Line, PieChart, Pie, Tooltip, ResponsiveContainer,
  CartesianGrid, XAxis, YAxis, Cell, ReferenceLine, Sector, Area
} from 'recharts';
import { CalendarDays, Share2, Download, ChevronDown, PlusCircle, BarChart3, ShoppingBag, UserPlus, Eye, Edit } from 'lucide-react';
import Footer from '../components/Footer';
import DashboardHeader from '../components/DashboardHeader';
import { toast } from '../components/ui/use-toast';
import dashboardData from '../data/dashboard.json';
import '../styles/dashboard.css';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [isLoading, setIsLoading] = useState(true);
  
  // Estado para o título do período selecionado
  const [periodTitle, setPeriodTitle] = useState('');

  // Verificar se o usuário está logado e é um organizador
  useEffect(() => {
    try {
      const loggedUser = JSON.parse(localStorage.getItem('usuarioLogado'));
      
      if (!loggedUser) {
        navigate('/login');
        return;
      }

      if (loggedUser.tipo !== 'organizador') {
        navigate('/');
        return;
      }

      setUser(loggedUser);
      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao verificar usuário:', error);
      navigate('/login');
    }
  }, [navigate]);

  // Atualizar o título do período quando o filtro mudar
  useEffect(() => {
    if (dashboardData.filtros && dashboardData.filtros[selectedPeriod]) {
      setPeriodTitle(dashboardData.filtros[selectedPeriod].descritor);
    }
  }, [selectedPeriod]);

  // Preparar dados para o gráfico de linha - Visitas
  const prepareLineChartData = () => {
    // Usar os dados do período selecionado
    const periodData = dashboardData[selectedPeriod] || dashboardData.month;
    return periodData.visitas.labels.map((label, index) => ({
      name: label,
      visitas: periodData.visitas.dados[index],
    }));
  };

  // Preparar dados para o gráfico de pizza - Distribuição de receita
  const preparePieChartData = () => {
    // Usar os dados do período selecionado
    const periodData = dashboardData[selectedPeriod] || dashboardData.month;
    return periodData.distribuicaoReceita.labels.map((label, index) => ({
      name: label,
      value: periodData.distribuicaoReceita.dados[index],
      fill: periodData.distribuicaoReceita.cores[index],
    }));
  };

  // Encontrar o dia com maior número de visitas para a linha de referência
  const findPeakDay = () => {
    const periodData = dashboardData[selectedPeriod] || dashboardData.month;
    return periodData.visitas.pico;
  };

  // Obter os dados dos eventos populares para o período selecionado
  const getPopularEvents = () => {
    const periodData = dashboardData[selectedPeriod] || dashboardData.month;
    return periodData.eventosPopulares;
  };

  // Obter os dados de vendas para o período selecionado
  const getSalesData = () => {
    const periodData = dashboardData[selectedPeriod] || dashboardData.month;
    return periodData.vendasAbril;
  };

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    toast({
      title: "Período alterado",
      description: `Período alterado para ${dashboardData.filtros[period].label}`,
      variant: "success"
    });
  };

  const handleCreateNewProduct = () => {
    navigate('/dashboard/create-event');
  };

  // Usar useMemo para evitar recálculos desnecessários
  const lineChartData = useMemo(() => prepareLineChartData(), [selectedPeriod]);
  const pieChartData = useMemo(() => preparePieChartData(), [selectedPeriod]);
  const peakDay = useMemo(() => findPeakDay(), [selectedPeriod]);
  const popularEvents = useMemo(() => getPopularEvents(), [selectedPeriod]);
  const salesData = useMemo(() => getSalesData(), [selectedPeriod]);

  // Configuração de cores para o gráfico de pizza
  const PIE_COLORS = useMemo(() => {
    const periodData = dashboardData[selectedPeriod] || dashboardData.month;
    return periodData.distribuicaoReceita.cores;
  }, [selectedPeriod]);
  
  // Renderizador personalizado para o tooltip do gráfico de pizza
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">
            <strong>{payload[0].name}</strong>: {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  // Renderizador personalizado para a fatia ativa do gráfico
  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 5}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };
  
  if (isLoading) {
    return <div className="dashboard-loading">Carregando...</div>;
  }

  return (
    <div className="dashboard-page">
      <DashboardHeader user={user} />
      
      {/* Adicionando um espaçador para compensar o header fixo */}
      <div className="header-spacer"></div>
      
      <div className="dashboard-content">
        <div className="dashboard-welcome">
          <h1>Dashboard</h1>
        </div>

        {/* Filtro de eventos */}
        <div className="dashboard-filters">
          <div className="filter-dropdown">
            <span>Todos os Eventos</span>
            <ChevronDown size={16} />
          </div>
          
          <div className="period-filters">
            <button 
              className={selectedPeriod === 'day' ? 'active' : ''} 
              onClick={() => handlePeriodChange('day')}
            >
              Dia
            </button>
            <button 
              className={selectedPeriod === 'week' ? 'active' : ''} 
              onClick={() => handlePeriodChange('week')}
            >
              Semana
            </button>
            <button 
              className={selectedPeriod === 'month' ? 'active' : ''} 
              onClick={() => handlePeriodChange('month')}
            >
              Mês
            </button>
            <button 
              className={selectedPeriod === 'semester' ? 'active' : ''} 
              onClick={() => handlePeriodChange('semester')}
            >
              Semestre
            </button>
            <button className="select-date">
              <CalendarDays size={16} />
              Selecionar
            </button>
          </div>
          
          <div className="chart-actions">
            <button className="action-button">
              <Download size={16} />
              Exportar
            </button>
            <button className="action-button">
              <Share2 size={16} />
              Compartilhar
            </button>
          </div>
        </div>
        
        {/* Dashboard Grid */}
        <div className="dashboard-grid">
          {/* Gráfico de visitas - ocupa span 4 */}
          <div className="dashboard-card visits-chart">
            <div className="card-header">
              <h2>Visitas à página - {periodTitle}</h2>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineChartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#888" 
                    tick={{ fill: '#888' }} 
                    tickLine={{ stroke: '#888' }} 
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  />
                  <YAxis 
                    stroke="#888" 
                    tick={{ fill: '#888' }} 
                    tickLine={{ stroke: '#888' }} 
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1c1c1c', 
                      borderColor: 'rgba(162, 0, 255, 0.3)',
                      color: 'white'
                    }}
                    labelStyle={{ color: 'white' }}
                    formatter={(value) => [`${value} visitas`, 'Visitas']}
                  />
                  {/* Linha de referência no pico */}
                  <ReferenceLine 
                    x={peakDay.dia} 
                    stroke="#ff2d55" 
                    strokeDasharray="3 3"
                    strokeWidth={1.5}
                    isFront={true}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="visitas" 
                    name="Visitas"
                    stroke="#b43eff" 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6, fill: '#b43eff', stroke: '#fff' }}
                  />
                  <defs>
                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#b43eff" stopOpacity={1.0}/>
                      <stop offset="10%" stopColor="#b43eff" stopOpacity={0.9}/>
                      <stop offset="30%" stopColor="#b43eff" stopOpacity={0.7}/>
                      <stop offset="60%" stopColor="#b43eff" stopOpacity={0.3}/>
                      <stop offset="100%" stopColor="#b43eff" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone"
                    dataKey="visitas"
                    stroke="none"
                    fill="url(#colorVisits)"
                    fillOpacity={1}
                    isAnimationActive={true}
                    animationDuration={1500}
                    baseValue={0}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Produtos mais vendidos - tabela conforme a imagem enviada */}
          <div className="dashboard-card popular-products">
            <h2 className="mb-4 text-xl font-medium">Produtos mais vendidos</h2>
            
            <div className="products-table">
              <table className="w-full">
                <thead className="text-left text-gray-400 border-b border-gray-800">
                  <tr>
                    <th className="py-3 px-4 font-medium">#</th>
                    <th className="py-3 px-4 font-medium">Nome</th>
                    <th className="py-3 px-4 font-medium w-full">Popularidade</th>
                    <th className="py-3 px-4 font-medium text-right">Vendas</th>
                  </tr>
                </thead>
                <tbody>
                  {popularEvents.map((event, index) => (
                    <tr key={event.id} className="border-b border-gray-800">
                      <td className="py-4 px-4 text-gray-300 font-medium">{String(index + 1).padStart(2, '0')}</td>
                      <td className="py-4 px-4 text-gray-300 whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                        {event.nome}
                      </td>
                      <td className="py-4 px-4">
                        <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-cuencos-purple" 
                            style={{ width: `${event.popularidade}%`, transition: 'width 1s ease-in-out' }} 
                          />
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="inline-block bg-cuencos-purple/30 text-cuencos-purple rounded px-2 py-0.5 text-sm font-medium">
                          {event.popularidade}%
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Container para Cards de KPIs e Gráfico de Pizza */}
          <div className="metrics-container">
            {/* Cards de KPIs e Métricas */}
            <div className="sales-summary">
              <div className="sales-header">
                <h2>Vendas em {periodTitle}</h2>
                <p className="card-subtitle">Resumo de vendas - {periodTitle}</p>
              </div>
              
              <div className="metrics-cards">
                <div className="summary-card">
                  <div className="summary-icon icon-sale">
                    <BarChart3 size={24} />
                  </div>
                  <div className="summary-content">
                    <div className="summary-value color-sale">R$ {salesData.total.toLocaleString('pt-BR')}</div>
                    <div className="summary-label">Venda total</div>
                    <div className="summary-trend">
                      <span className="trend-sale">+{salesData.crescimento}% desde o período anterior</span>
                    </div>
                  </div>
                </div>
                
                <div className="summary-card">
                  <div className="summary-icon icon-product">
                    <ShoppingBag size={24} />
                  </div>
                  <div className="summary-content">
                    <div className="summary-value color-product">{salesData.produtosVendidos}</div>
                    <div className="summary-label">Produtos Vendidos</div>
                    <div className="summary-trend">
                      <span className="trend-product">+{salesData.crescimentoProdutos}% desde período anterior</span>
                    </div>
                  </div>
                </div>
                
                <div className="summary-card">
                  <div className="summary-icon icon-customer">
                    <UserPlus size={24} />
                  </div>
                  <div className="summary-content">
                    <div className="summary-value color-customer">{salesData.novosClientes}</div>
                    <div className="summary-label">Novos clientes</div>
                    <div className="summary-trend">
                      <span className="trend-customer">+{salesData.crescimentoClientes}% desde período anterior</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Distribuição da receita - gráfico de pizza reformulado */}
            <div className="revenue-distribution">
              <div className="revenue-header">
                <h2>Distribuição da receita</h2>
                <span className="revenue-period">{periodTitle}</span>
              </div>
              
              <div className="pie-chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      activeIndex={0} // Destaque para o primeiro item
                      activeShape={renderActiveShape}
                      outerRadius={80}
                      innerRadius={35}
                      paddingAngle={3}
                      dataKey="value"
                      strokeWidth={1}
                      stroke="#2d2d2d"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={PIE_COLORS[index % PIE_COLORS.length]} 
                          strokeWidth={index === 0 ? 1 : 0}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="legend-container">
                <div className="legend-grid">
                  {pieChartData.map((entry, index) => (
                    <div className="legend-item" key={`legend-${index}`}>
                      <div className="legend-text">
                        <div className="legend-color" style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}></div>
                        {entry.name}
                        <div className="legend-value">{entry.value}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DashboardPage;